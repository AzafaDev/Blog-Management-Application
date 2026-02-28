import { useFormik } from "formik";
import { useUserStore } from "../stores/useUserStore";
import { userSchema } from "../schemas/user.schema";

const useLoginForm = () => {
  const { handleLogin } = useUserStore();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      await handleLogin(values);
      const modal = document.getElementById("login_modal") as HTMLDialogElement;
      if (modal) modal.close();
      formik.resetForm();
    },
  });

  return { formik };
};

export default useLoginForm;
