import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";
import { 
  UsersIcon, 
  SearchIcon, 
  FilterIcon, 
  MessageCircleIcon,
  VideoIcon,
  MapPinIcon,
  GlobeIcon,
  BookOpenIcon
} from "lucide-react";

import { getUserFriends } from "../lib/api";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Filter friends based on search term and selected language
  const filteredFriends = friends.filter((friend) => {
    const matchesSearch = friend.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (friend.location && friend.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = selectedLanguage === "all" || 
                           friend.nativeLanguage === selectedLanguage ||
                           friend.learningLanguage === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });

  // Get unique languages for filter
  const languages = ["all", ...new Set([
    ...friends.map(f => f.nativeLanguage),
    ...friends.map(f => f.learningLanguage)
  ].filter(Boolean))];

  const stats = {
    totalFriends: friends.length,
    onlineFriends: friends.filter(f => f.isOnline).length,
    languages: new Set([
      ...friends.map(f => f.nativeLanguage),
      ...friends.map(f => f.learningLanguage)
    ]).size
  };

  const quickActions = [
    {
      icon: MessageCircleIcon,
      title: "Group Chat",
      description: "Start a conversation with multiple friends",
      color: "from-primary-500 to-primary-600",
      href: "#"
    },
    {
      icon: VideoIcon,
      title: "Group Call",
      description: "Practice speaking with your language partners",
      color: "from-secondary-500 to-secondary-600",
      href: "#"
    },
    {
      icon: GlobeIcon,
      title: "Language Exchange",
      description: "Organize language exchange sessions",
      color: "from-accent-500 to-accent-600",
      href: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">
                  Your Language Partners
                </h1>
                <p className="text-lg text-white/90 font-body">
                  Connect, practice, and grow together with your friends
                </p>
              </div>
              <div className="flex gap-4">
                <Link to="/discover" className="btn bg-white/20 hover:bg-white/30 text-white border-0">
                  <UsersIcon className="mr-2 size-4" />
                  Find New Partners
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-primary-600">
                  {stats.totalFriends}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Total Friends</h3>
              <p className="text-sm text-neutral-600 font-body">Your language partners</p>
            </div>

            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <GlobeIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-accent-600">
                  {stats.languages}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Languages</h3>
              <p className="text-sm text-neutral-600 font-body">Different languages</p>
            </div>

            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-secondary-600">
                  {stats.onlineFriends}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Online Now</h3>
              <p className="text-sm text-neutral-600 font-body">Ready to practice</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="card-lingualink p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 size-5" />
                <input
                  type="text"
                  placeholder="Search friends by name or location..."
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-body"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Language Filter */}
              <div className="relative">
                <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 size-5" />
                <select
                  className="pl-10 pr-8 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-body appearance-none bg-white"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  {languages.map((language) => (
                    <option key={language} value={language}>
                      {language === "all" ? "All Languages" : language}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={index}
                    to={action.href}
                    className="card-lingualink p-5 hover:scale-105 transition-transform duration-200 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-neutral-800 mb-2 line-clamp-1">{action.title}</h3>
                    <p className="text-sm text-neutral-600 font-body line-clamp-2">{action.description}</p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Friends List */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-2">
                  All Friends ({filteredFriends.length})
                </h2>
                <p className="text-neutral-600 font-body">
                  {searchTerm || selectedLanguage !== "all" 
                    ? `Showing ${filteredFriends.length} of ${friends.length} friends`
                    : "Your complete list of language partners"
                  }
                </p>
              </div>
            </div>

            {loadingFriends ? (
              <div className="flex justify-center py-12">
                <div className="loading loading-spinner loading-lg text-primary-500"></div>
              </div>
            ) : filteredFriends.length === 0 ? (
              <div className="card-lingualink p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-neutral-800">
                  {searchTerm || selectedLanguage !== "all" ? "No friends found" : "No friends yet"}
                </h3>
                <p className="text-neutral-600 font-body mb-4">
                  {searchTerm || selectedLanguage !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "Start by connecting with language partners from the discover page"
                  }
                </p>
                {!searchTerm && selectedLanguage === "all" && (
                  <Link to="/discover" className="btn-lingualink inline-flex">
                    <UsersIcon className="mr-2 size-4" />
                    Find Language Partners
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFriends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage; 