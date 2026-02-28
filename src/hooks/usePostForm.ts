import { useFormik } from "formik";
import { blogSchema } from "../schemas/blog.schema";
import { useBlogStore } from "../stores/useBlogStore";

const usePostForm = () => {
  const { postBlog } = useBlogStore();
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      content: "",
      date: Date.now(),
    },
    validationSchema: blogSchema,
    onSubmit: async ({ title, author, content, date }) => {
      postBlog({ title, author, content, date });
      (document.getElementById("post_modal") as HTMLDialogElement).close();
      formik.resetForm();
    },
  });
  return {formik}
};

export default usePostForm;
