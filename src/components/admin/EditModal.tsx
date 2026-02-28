import { X, Send, Type, User, AlignLeft, Calendar } from "lucide-react";
import type { Blog } from "../../stores/useBlogStore";
import useEditForm from "../../hooks/useEditForm";

const EditModal = ({
  objectId,
  title,
  author,
  content,
  publishedDate: date,
}: Blog) => {
  const { formik } = useEditForm({
    objectId,
    title,
    author,
    content,
    publishedDate: date,
  });
  return (
    <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box p-0 overflow-hidden rounded-4xl bg-white">
        {/* HEADER MODAL */}
        <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="font-black text-xl tracking-tight">Edit Post</h3>
            <p className="text-indigo-100 text-xs">
              Fill in the details to edit your blog.
            </p>
          </div>
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm text-white hover:bg-indigo-500">
              <X size={20} />
            </button>
          </form>
        </div>

        {/* FORM BODY */}
        <form className="p-8 space-y-5" onSubmit={formik.handleSubmit}>
          {/* TITLE INPUT */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                <Type size={16} className="text-indigo-500" /> Title
              </span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Ex: Journey to the West"
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white transition-all border-none ring-1 ring-gray-200 focus:ring-1 focus:ring-indigo-500"
            />
            <p className="text-error text-[10px] mt-1 italic font-medium">
              {formik.errors.title as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* AUTHOR INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                  <User size={16} className="text-indigo-500" /> Author
                </span>
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formik.values.author}
                onChange={formik.handleChange}
                placeholder="Your name"
                className="input input-bordered w-full rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-1 focus:ring-indigo-500"
              />
              <p className="text-error text-[10px] mt-1 italic font-medium">
                {formik.errors.author as string}
              </p>
            </div>

            {/* DATE INPUT (ReadOnly) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" /> Date
                </span>
              </label>
              <input
                type="text"
                id="date"
                name="date"
                value={new Date(formik.values.date).toLocaleDateString("id-ID")}
                disabled
                className="input input-bordered w-full rounded-xl bg-gray-100 border-none cursor-not-allowed text-gray-500"
              />
            </div>
          </div>

          {/* CONTENT INPUT */}
          <div className="form-control flex flex-col gap-4">
            <label className="label">
              <span className="label-text font-bold text-gray-700 flex items-center gap-2">
                <AlignLeft size={16} className="text-indigo-500" /> Content
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 rounded-xl w-full bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-1 focus:ring-indigo-500"
              placeholder="Write your story here..."
              id="content"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
            ></textarea>
            <p className="text-error text-[10px] mt-1 italic font-medium">
              {formik.errors.content as string}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="modal-action mt-8">
            <button
              type="submit"
              disabled={!formik.isValid}
              className="btn btn-primary w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 border-none shadow-lg shadow-indigo-200"
            >
              <Send size={18} />
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditModal;
