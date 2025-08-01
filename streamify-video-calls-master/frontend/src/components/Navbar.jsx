import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import LinguaLinkLogo from "./LinguaLinkLogo";
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  const { data: friendRequests } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];
  const notificationCount = incomingRequests.length + acceptedRequests.length;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2.5">
                <LinguaLinkLogo size="default" />
              </Link>
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <Link to={"/notifications"} className="relative">
              <button className="btn btn-ghost btn-circle hover:bg-neutral-100 transition-colors p-2">
                <BellIcon className="h-5 w-5 text-neutral-600" />
                {notificationCount > 0 && (
                  <span className="badge badge-primary absolute -top-1 -right-1 text-xs">
                    {notificationCount}
                  </span>
                )}
              </button>
            </Link>

            <ThemeSelector />

            <div className="avatar flex-shrink-0">
              <div className="w-8 h-8 rounded-full ring-2 ring-primary-100 hover:ring-primary-200 transition-all">
                <img src={authUser?.profilePic} alt="User Avatar" rel="noreferrer" />
              </div>
            </div>

            {/* Logout button */}
            <button 
              className="btn btn-ghost btn-circle hover:bg-neutral-100 transition-colors p-2" 
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-5 w-5 text-neutral-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
