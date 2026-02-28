import { useFormik } from "formik";
import { blogSchema } from "../schemas/blog.schema";
import { useBlogStore } from "../stores/useBlogStore";

const useEditForm = ({ title, author, content, date, objectId }: any) => {
  const { updateBlog } = useBlogStore();
  const formik = useFormik({
    initialValues: {
      objectId,
      title,
      author,
      content,
      date: Date.now(),
    },
    validationSchema: blogSchema,
    onSubmit: async ({ title, author, content, date, objectId }) => {
      updateBlog({ title, author, content, publishedDate: date, objectId });
      (document.getElementById("edit_modal") as HTMLDialogElement).close();
      formik.resetForm();
    },
  });
  return { formik };
};

export default useEditForm;
