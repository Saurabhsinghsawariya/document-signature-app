import { useEffect, useState } from "react";
import PDFPreview from "../components/PDFPreview";
import api from "../services/api";

interface Document {
  _id: string;
  filename: string;
  path: string;
}

export default function Dashboard() {
  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await api.get("/docs");
        setDocs(res.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Uploaded PDFs</h1>
      <div className="space-y-6">
        {docs.map((doc) => (
          <div key={doc._id} className="p-4 border rounded shadow">
            <p className="font-medium">{doc.filename}</p>
            <PDFPreview fileUrl={`http://localhost:5000/${doc.path}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
