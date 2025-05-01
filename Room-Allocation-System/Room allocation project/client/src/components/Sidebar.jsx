import { Link, useLocation } from "react-router-dom";
import {
  HiUser,
  HiDatabase,
  HiBookOpen,
  HiAcademicCap,
  HiClipboardList,
  HiCalendar,
  HiOfficeBuilding,
  HiLogout,
  HiMenuAlt2,
} from "react-icons/hi";

export default function Sidebar({ roleLinks = [], onSignOut, onToggle, expanded = true }) {
  const path = useLocation().pathname;

  const getIcon = (name) => {
    const icons = {
      HiUser,
      HiDatabase,
      HiBookOpen,
      HiAcademicCap,
      HiClipboardList,
      HiCalendar,
      HiOfficeBuilding,
    };
    return icons[name] || HiUser;
  };

  return (
    <aside
      className={`${
        expanded ? "w-64" : "w-20"
      } bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen fixed top-0 left-0 transition-all duration-300 z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <span className={`text-2xl font-extrabold text-teal-400 ${!expanded && "hidden"}`}>EduSync</span>
        <button
          onClick={() => onToggle((prev) => !prev)}
          className="text-white text-xl focus:outline-none"
        >
          <HiMenuAlt2 />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {roleLinks.map(({ to, label, icon }) => {
          const Icon = getIcon(icon.name);
          const isActive = path === to;

          return (
            <Link
              to={to}
              key={to}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Icon className="text-xl" />
              {expanded && <span className="text-sm font-medium">{label}</span>}
            </Link>
          );
        })}

        {/* Sign Out */}
        <button
          onClick={onSignOut}
          className="flex items-center gap-3 px-4 py-2 mt-4 rounded-lg text-red-400 hover:text-white hover:bg-red-600 transition-colors w-full"
        >
          <HiLogout className="text-xl" />
          {expanded && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </nav>
    </aside>
  );
}
