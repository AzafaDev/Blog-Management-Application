import { Lock, Mail, X } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginModal = ({ formik }: { formik: any }) => {
  const { isLoading } = useUserStore();
  return (
    <dialog id="login_modal" className="modal">
      <div className="modal-box bg-white p-0 rounded-[2.5rem] overflow-hidden shadow-2xl max-w-100">
        <div className="bg-indigo-600 p-10 text-center relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-indigo-900/20 rounded-full blur-3xl"></div>
          <h3 className="font-black text-3xl text-white relative z-10">
            Welcome!
          </h3>
          <p className="text-indigo-100 text-sm mt-2 relative z-10 opacity-80">
            Log in to manage your content
          </p>
        </div>

        <div className="p-10 pt-8">
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="mail@example.com"
                  className={`input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white transition-all ${formik.errors.email && formik.touched.email ? "input-error" : ""}`}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <span className="text-red-500 text-[11px] font-bold mt-1 ml-1 italic">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                  Security Password
                </span>
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  placeholder="••••••••"
                  className={`input input-bordered w-full pl-12 rounded-2xl bg-gray-50 border-gray-200 focus:bg-white transition-all ${formik.errors.password && formik.touched.password ? "input-error" : ""}`}
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-500 text-[11px] font-bold mt-1 ml-1 italic">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full h-14 rounded-2xl shadow-xl shadow-indigo-100 border-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-md mt-4 ${isLoading ? "" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? <div className="loading"></div> : "Enter Dashboard"}
            </button>
          </form>

          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white/50 hover:text-white hover:bg-white/10 transition-all border-none">
              <X size={20} />
            </button>
          </form>
        </div>
      </div>
      <form
        method="dialog"
        className="modal-backdrop backdrop-blur-md bg-indigo-950/20"
      >
        <button>close</button>
      </form>
    </dialog>
  );
};

export default LoginModal;
