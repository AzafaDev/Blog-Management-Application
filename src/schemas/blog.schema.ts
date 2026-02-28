import * as yup from "yup";

export const blogSchema = yup.object({
  title: yup
    .string()
    .required("Title is required!")
    .min(5, "Title must be at least 5 characters!")
    .max(100, "Title must be at most 100 characters!"),
  author: yup
    .string()
    .required("Author is required!")
    .min(3, "Author must be at least 3 characters")
    .max(20, "Author must be at most 20 characters"),
  content: yup
    .string()
    .required("Content is required!")
    .min(30, "Author must be at least 30 characters")
    .max(250, "Author must be at most 250 characters"),
});
