import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define Document Schema
const documentSchema = new mongoose.Schema({
  _id: String,
  data: Object
});

const Document = mongoose.model('Document', documentSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Default value for new documents
const defaultValue = "";

// Set up Socket.io server
const io = new Server(5173, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Track active users per document
const documentUsers = new Map();

// Track which document each socket is viewing
const socketDocuments = new Map();

io.on("connection", socket => {
  console.log("New client connected");
  
  socket.on("get-document", async documentId => {
    console.log("Document requested:", documentId);
    
    // Store the current document for this socket
    socketDocuments.set(socket.id, documentId);
    
    socket.join(documentId);

    if (!documentUsers.has(documentId)) {
      documentUsers.set(documentId, new Set());
    }

    documentUsers.get(documentId).add(socket.id);

    const activeUsers = documentUsers.get(documentId).size;
    console.log(`Active users in document ${documentId}: ${activeUsers}`);
    
    // Emit active users count to all clients in this document
    io.to(documentId).emit("active-users-update", activeUsers);
    
    const document = await findOrCreateDocument(documentId);

    socket.emit("load-document", document.data);

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async data => {
      console.log("Saving document:", documentId);
      try {
        await Document.findByIdAndUpdate(documentId, { data });
        socket.emit("save-document-success");
      } catch (error) {
        console.error("Error saving document:", error);
        socket.emit("save-document-error");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    
    const documentId = socketDocuments.get(socket.id);
    
    // Remove socket from socketDocuments map
    socketDocuments.delete(socket.id);
    
    // Remove user from the document they were viewing
    if (documentId && documentUsers.has(documentId)) {
      documentUsers.get(documentId).delete(socket.id);
      
      const activeUsers = documentUsers.get(documentId).size;
      console.log(`Active users in document ${documentId}: ${activeUsers}`);
      
      io.to(documentId).emit("active-users-update", activeUsers);
      
      if (documentUsers.get(documentId).size === 0) {
        documentUsers.delete(documentId);
      }
    }
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return null;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}