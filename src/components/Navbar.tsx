import { useUserStore } from "../stores/useUserStore";
import { Link } from "react-router-dom";
import { User, LogOut, LayoutDashboard } from "lucide-react";
import LoginModal from "./LoginModal";
import useLoginForm from "../hooks/useLoginForm";

const Navbar = () => {
  const { currentUser, handleLogout, } = useUserStore();

  const { formik } = useLoginForm();

  return (
    <nav className="navbar bg-white/70 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/50 px-4 md:px-12 transition-all">
      {/* LEFT: Logo Section */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-linear-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 group-hover:rotate-6 transition-transform duration-300">
            <span className="text-white font-black text-2xl tracking-tighter">
              B.
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tight text-gray-800 hidden sm:block">
              DevBlog
            </span>
            <span className="text-[10px] font-bold text-indigo-500 tracking-[0.2em] hidden sm:block">
              CREATIVE
            </span>
          </div>
        </Link>
      </div>

      {/* RIGHT: Menu Section */}
      <div className="navbar-end gap-2">
        {!currentUser ? (
          <button
            className="btn btn-primary btn-md rounded-2xl px-8 border-none bg-linear-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:shadow-indigo-200 transition-all lowercase font-bold tracking-tight"
            onClick={() =>
              (
                document.getElementById("login_modal") as HTMLDialogElement
              ).showModal()
            }
          >
            Sign In
          </button>
        ) : (
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-full border border-gray-100">
            <Link
              to="/admin"
              className="btn btn-ghost btn-sm rounded-full hidden md:flex font-bold text-gray-600"
            >
              <LayoutDashboard size={16} className="mr-2" />
              Dashboard
            </Link>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar placeholder"
              >
                <div className="bg-indigo-600 text-white rounded-full w-10 ring ring-indigo-100 ring-offset-2 flex items-center justify-center">
                  <User size={20} />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <ul
                tabIndex={0}
                className="mt-4 z-1 p-2 shadow-2xl menu menu-md dropdown-content bg-white rounded-3xl w-64 border border-gray-100 animate-in fade-in slide-in-from-top-2"
              >
                <div className="px-4 py-3 mb-2 bg-gray-50 rounded-2xl">
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
                    Account
                  </p>
                  <p className="text-sm font-bold text-gray-700 truncate">
                    {currentUser.email}
                  </p>
                </div>
                <li>
                  <Link to="/admin" className="md:hidden font-semibold">
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-bold hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* LOGIN MODAL */}
      <LoginModal formik={formik} />
    </nav>
  );
};

export default Navbar;
