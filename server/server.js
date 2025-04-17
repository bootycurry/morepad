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

// Handle socket connections
io.on("connection", socket => {
  console.log("New client connected");
  
  socket.on("get-document", async documentId => {
    console.log("Document requested:", documentId);
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
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
});

// Helper function to find or create a document
async function findOrCreateDocument(id) {
  if (id == null) return null;

  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}