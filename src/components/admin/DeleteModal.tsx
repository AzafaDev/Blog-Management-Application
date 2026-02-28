import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteModalProps {
  title: string;
  onConfirm: () => void; 
}

const DeleteModal = ({ title, onConfirm }: DeleteModalProps) => {
  return (
    <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box rounded-4xl p-0 overflow-hidden border border-red-50/50 shadow-2xl">
        
        {/* BAGIAN VISUAL (RED HEADER) */}
        <div className="bg-red-50 p-8 flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle size={40} />
          </div>
          <h3 className="font-black text-2xl text-red-600 tracking-tight">Are you sure?</h3>
        </div>

        {/* BAGIAN PESAN */}
        <div className="p-8 text-center">
          <p className="text-gray-500 leading-relaxed">
            You are about to delete the post: <br />
            <span className="font-bold text-gray-800">"{title}"</span>
          </p>
        </div>

        {/* TOMBOL AKSI */}
        <div className="p-8 pt-0 flex flex-col sm:flex-row gap-3">
          <form method="dialog" className="flex-1">
            <button className="btn btn-ghost w-full rounded-2xl text-gray-500 font-bold">
              No, Cancel
            </button>
          </form>

          <button
            className="btn btn-error flex-[1.5] rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold"
            onClick={onConfirm} 
          >
            <Trash2 size={18} /> Yes, Delete Post
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;