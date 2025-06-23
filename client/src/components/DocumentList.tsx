import axios from "axios";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import SignatureOverlay from "./SignatureOverlay";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type Doc = {
  _id: string;
  filename: string;
  path: string;
  originalName: string;
};

const DocumentList = () => {
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [token] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/docs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocuments(res.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      }
    };
    fetchDocs();
  }, []);

  const handleDrop = async (x: number, y: number) => {
    if (!selectedDoc) return;
    try {
      await axios.post(
        "http://localhost:5000/api/signatures",
        {
          documentId: selectedDoc._id,
          x,
          y,
          page: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Signature position saved!");
    } catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    alert(err.response?.data?.message || "Failed to save signature");
  } else {
    alert("Failed to save signature");
  }
}
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documents.map((doc) => (
          <div
            key={doc._id}
            onClick={() => setSelectedDoc(doc)}
            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-100"
          >
            <p className="font-bold">{doc.originalName}</p>
            <p className="text-xs text-gray-500">{doc.filename}</p>
          </div>
        ))}
      </div>

      {selectedDoc && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-2">Preview: {selectedDoc.originalName}</h3>
          <div className="border p-4">
            <Document file={`http://localhost:5000/${selectedDoc.path}`}>
              <Page pageNumber={1} />
            </Document>
            <SignatureOverlay onDrop={handleDrop} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
