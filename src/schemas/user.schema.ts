import * as yup from "yup";

export const userSchema = yup.object({
  email: yup.string().required("Email is required").email().trim(),
  password: yup.string().required("Password is required").min(8, "Password must be at least 8 characters").max(16, "Password must be at most 16 characters").trim(),
});
