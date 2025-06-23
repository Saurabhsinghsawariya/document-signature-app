import axios from "axios";
import { useEffect, useState } from "react";
import PDFViewer from "../components/PDFViewer";

interface Document {
  _id: string;
  originalname: string;
  filename: string;
  uploadDate: string;
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/docs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDocs(res.data);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Uploaded PDFs</h2>
      <div className="space-y-8">
        {docs.map((doc) => (
          <div key={doc._id} className="border p-4 rounded bg-white shadow">
            <p className="font-semibold mb-2">{doc.originalname}</p>
            <PDFViewer fileUrl={`http://localhost:5000/uploads/${doc.filename}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
