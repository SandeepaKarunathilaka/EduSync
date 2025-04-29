import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight, HiDatabase } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col md:flex-row min-h-full">
        <Sidebar className="w-full md:w-64 bg-gray-200 text-gray-700">
          <Sidebar.Items>
            <Sidebar.ItemGroup>

              <Link to="/profile">
                <Sidebar.Item
                  active={path === "/profile"}
                  icon={HiUser}
                  className="my-2 w-full rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  Profile
                </Sidebar.Item>
              </Link>

              {currentUser.isAdmin && (
                <Link to="/dashboard">
                  <Sidebar.Item
                    active={path === "/dashboard"}
                    icon={HiDatabase}
                    className="my-2 w-full rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-100"
                  >
                    Dashboard
                  </Sidebar.Item>
                </Link>
              )}

              <Link to="/user-booking">
                <Sidebar.Item
                  active={path === "/user-booking"}
                  icon={HiArrowSmRight}
                  className="my-2 w-full rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  Request a Room
                </Sidebar.Item>
              </Link>

              <Link to="/my-bookings">
                <Sidebar.Item
                  active={path === "/my-bookings"}
                  icon={HiArrowSmRight}
                  className="my-2 w-full rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  My Bookings
                </Sidebar.Item>
              </Link>

              <Link to="/class-schedule">
                <Sidebar.Item
                  active={path === "/class-schedule"}
                  icon={HiArrowSmRight}
                  className="my-2 w-full rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-100"
                >
                  Class Schedule
                </Sidebar.Item>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 my-2 w-full p-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-100 transition"
              >
                <HiArrowSmRight className="text-xl" />
                Sign Out
              </button>

            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {currentUser.isAdmin && (
        <div className="text-center mt-6">
          <h1 className="text-blue-600 text-3xl font-bold">Welcome Admin</h1>
        </div>
      )}
    </div>
  );
}
