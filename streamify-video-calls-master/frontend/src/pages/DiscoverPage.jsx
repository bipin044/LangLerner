import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  UsersIcon, 
  SearchIcon, 
  FilterIcon, 
  MapPinIcon,
  GlobeIcon,
  StarIcon,
  UserPlusIcon,
  CheckCircleIcon,
  XIcon,
  MessageCircleIcon
} from "lucide-react";

import { 
  getRecommendedUsers, 
  sendFriendRequest,
  getOutgoingFriendReqs 
} from "../lib/api";
import { capitialize } from "../lib/utils";
import { getLanguageFlag } from "../components/FriendCard";

const DiscoverPage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  // Filter users
  const filteredUsers = recommendedUsers.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.location && user.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLanguage = selectedLanguage === "all" || 
                           user.nativeLanguage === selectedLanguage ||
                           user.learningLanguage === selectedLanguage;
    
    return matchesSearch && matchesLanguage;
  });

  // Get unique languages for filter
  const languages = ["all", ...new Set([
    ...recommendedUsers.map(u => u.nativeLanguage),
    ...recommendedUsers.map(u => u.learningLanguage)
  ].filter(Boolean))];

  const stats = {
    totalUsers: recommendedUsers.length,
    filteredUsers: filteredUsers.length,
    languages: new Set([
      ...recommendedUsers.map(u => u.nativeLanguage),
      ...recommendedUsers.map(u => u.learningLanguage)
    ]).size
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLanguage("all");
  };

  const hasActiveFilters = searchTerm || selectedLanguage !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">
                  Discover Language Partners
                </h1>
                <p className="text-lg text-white/90 font-body">
                  Find perfect language exchange partners from around the world
                </p>
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
                  {stats.totalUsers}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Available Partners</h3>
              <p className="text-sm text-neutral-600 font-body">Ready to connect</p>
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
              <p className="text-sm text-neutral-600 font-body">Different languages available</p>
            </div>

            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <StarIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-secondary-600">
                  {filteredUsers.length}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Matches Found</h3>
              <p className="text-sm text-neutral-600 font-body">Based on your criteria</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="card-lingualink p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 size-5" />
                <input
                  type="text"
                  placeholder="Search by name, location, or interests..."
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

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="btn btn-outline btn-sm font-accent"
                >
                  <XIcon className="size-4 mr-1" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-2">
                  Language Partners ({filteredUsers.length})
                </h2>
                <p className="text-neutral-600 font-body">
                  {hasActiveFilters 
                    ? `Showing ${filteredUsers.length} of ${recommendedUsers.length} partners`
                    : "Discover amazing language partners from around the world"
                  }
                </p>
              </div>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <div className="loading loading-spinner loading-lg text-primary-500"></div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="card-lingualink p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-neutral-800">
                  {hasActiveFilters ? "No partners found" : "No partners available"}
                </h3>
                <p className="text-neutral-600 font-body mb-4">
                  {hasActiveFilters 
                    ? "Try adjusting your search or filter criteria"
                    : "Check back later for new language partners"
                  }
                </p>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="btn-lingualink inline-flex">
                    <XIcon className="mr-2 size-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                  const compatibilityScore = Math.floor(Math.random() * 40) + 60;

                  return (
                    <div
                      key={user._id}
                      className="card-lingualink hover:scale-105 transition-all duration-300 group"
                    >
                      <div className="p-5 space-y-4">
                        {/* User Header */}
                        <div className="flex items-start gap-3">
                          <div className="avatar flex-shrink-0">
                            <div className="w-14 h-14 rounded-full ring-2 ring-primary-100">
                              <img src={user.profilePic} alt={user.fullName} />
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading font-semibold text-neutral-800 truncate">{user.fullName}</h3>
                            {user.location && (
                              <div className="flex items-center text-sm text-neutral-500 mt-1 font-body">
                                <MapPinIcon className="size-4 mr-1 flex-shrink-0" />
                                <span className="truncate">{user.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Compatibility Score */}
                          <div className="flex-shrink-0">
                            <div className="flex items-center gap-1 bg-accent-50 px-2 py-1 rounded-lg">
                              <StarIcon className="size-3 text-accent-600" />
                              <span className="text-xs font-medium text-accent-600">{compatibilityScore}%</span>
                            </div>
                          </div>
                        </div>

                        {/* Languages */}
                        <div className="flex flex-wrap gap-1.5">
                          <span className="badge badge-primary badge-outline font-body text-xs px-2 py-1">
                            {getLanguageFlag(user.nativeLanguage)}
                            <span className="truncate">Native: {capitialize(user.nativeLanguage)}</span>
                          </span>
                          <span className="badge badge-secondary badge-outline font-body text-xs px-2 py-1">
                            {getLanguageFlag(user.learningLanguage)}
                            <span className="truncate">Learning: {capitialize(user.learningLanguage)}</span>
                          </span>
                        </div>

                        {/* Bio */}
                        {user.bio && (
                          <p className="text-sm text-neutral-600 font-body line-clamp-2">{user.bio}</p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            className={`flex-1 btn font-accent text-sm py-2 ${
                              hasRequestBeenSent 
                                ? "btn-disabled bg-neutral-100 text-neutral-400" 
                                : "btn-lingualink"
                            }`}
                            onClick={() => sendRequestMutation(user._id)}
                            disabled={hasRequestBeenSent || isPending}
                          >
                            {hasRequestBeenSent ? (
                              <>
                                <CheckCircleIcon className="size-4 mr-2 flex-shrink-0" />
                                <span className="truncate">Request Sent</span>
                              </>
                            ) : (
                              <>
                                <UserPlusIcon className="size-4 mr-2 flex-shrink-0" />
                                <span className="truncate">Connect</span>
                              </>
                            )}
                          </button>
                          
                          <Link 
                            to={`/chat/${user._id}`} 
                            className="btn btn-outline btn-sm font-accent hover:bg-primary-50 hover:border-primary-300 transition-colors"
                          >
                            <MessageCircleIcon className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage; 