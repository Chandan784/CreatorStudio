import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, logoutUser } from "@/store/slice/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 🔄 Fetch user on navbar load
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setIsProfileModalOpen(false);
      router.push("/");
    } catch (err) {
      alert("Logout failed.");
    }
  };

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          OnlyCreation
        </h1>

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            <a
              href="/auth"
              className="px-6 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </a>
          ) : (
            <div
              className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-700"
              onClick={() => setIsProfileModalOpen(true)}
              title="Profile"
            >
              {getInitial()}
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex items-center gap-4">
          {!isLoggedIn ? (
            <a
              href="/auth"
              className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
            >
              Login
            </a>
          ) : (
            <div
              className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer hover:bg-indigo-700"
              onClick={() => setIsProfileModalOpen(true)}
              title="Profile"
            >
              {getInitial()}
            </div>
          )}
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">Profile</h2>

            {user && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Role
                  </label>
                  <p className="mt-1 text-gray-900">{user.role}</p>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={() => setIsProfileModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
