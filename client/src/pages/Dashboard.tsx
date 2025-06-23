import DocumentList from "../components/DocumentList";
import UploadForm from "../components/UploadForm";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">📄 My Documents</h1>
        <UploadForm />
        <DocumentList />
      </div>
    </div>
  );
};

export default Dashboard;
