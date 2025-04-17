import TextEditor from "@/app/components/TextEditor";

export default function DocumentPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto">
      <TextEditor documentId={params.id} />
    </div>
  );
}