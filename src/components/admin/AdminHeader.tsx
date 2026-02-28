import { Plus } from "lucide-react";

const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-black text-gray-900">Post Manager</h1>
        <p className="text-gray-500 mt-1">Manage your blog stories</p>
      </div>
      <button
        className="btn btn-primary rounded-2xl bg-indigo-600 border-none px-6 shadow-lg"
        onClick={() =>
          (
            document.getElementById("post_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <Plus size={20} /> Create Post
      </button>
    </div>
  );
};

export default AdminHeader;
