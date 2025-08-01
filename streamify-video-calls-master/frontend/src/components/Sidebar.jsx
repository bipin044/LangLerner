import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon, GlobeIcon, BookOpenIcon } from "lucide-react";
import LinguaLinkLogo from "./LinguaLinkLogo";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      path: "/",
      icon: HomeIcon,
      label: "Home",
      description: "Your learning dashboard"
    },
    {
      path: "/friends",
      icon: UsersIcon,
      label: "Friends",
      description: "Your language partners"
    },
    {
      path: "/discover",
      icon: GlobeIcon,
      label: "Discover",
      description: "Find new partners"
    },
    {
      path: "/practice",
      icon: BookOpenIcon,
      label: "Practice",
      description: "Learning activities"
    },
    {
      path: "/notifications",
      icon: BellIcon,
      label: "Notifications",
      description: "Stay updated"
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-neutral-200">
        <Link to="/" className="flex items-center gap-2.5">
          <LinguaLinkLogo size="default" />
        </Link>
        <p className="text-sm text-neutral-500 mt-2 font-body line-clamp-2">
          Where Languages Connect, Cultures Unite
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg" 
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-primary-600"
              }`}
            >
              <Icon className={`size-5 flex-shrink-0 mt-0.5 ${isActive ? "text-white" : "text-neutral-500 group-hover:text-primary-500"}`} />
              <div className="flex-1 min-w-0">
                <span className="font-medium text-sm block truncate">{item.label}</span>
                <p className={`text-xs ${isActive ? "text-white/80" : "text-neutral-400"} line-clamp-1`}>
                  {item.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 border-t border-neutral-200 mt-auto">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
          <div className="avatar flex-shrink-0">
            <div className="w-10 h-10 rounded-full ring-2 ring-primary-100">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-neutral-800 truncate">{authUser?.fullName}</p>
            <p className="text-xs text-accent-600 flex items-center gap-1">
              <span className="size-2 rounded-full bg-accent-400 inline-block animate-pulse flex-shrink-0"></span>
              <span className="truncate">Online</span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
