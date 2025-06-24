import DocumentList from "../components/DocumentList";
import UploadForm from "../components/UploadForm";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">📄 My Documents</h1>
        <UploadForm />
        <DocumentList />
      </div>
    </div>
  );
};

export default Dashboard;
