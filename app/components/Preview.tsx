"use client"

interface PreviewProps {
  content: string;
  title: string;
}

export default function Preview({ content, title }: PreviewProps) {
  return (
    <div className="preview-container h-full w-full overflow-auto bg-gray-100 p-8">
      <div className="preview-content max-w-3xl mx-auto bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div
          className="preview-body leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}