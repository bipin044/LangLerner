import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { 
  CheckCircleIcon, 
  MapPinIcon, 
  UserPlusIcon, 
  UsersIcon, 
  TrendingUpIcon,
  CalendarIcon,
  TargetIcon,
  AwardIcon,
  MessageCircleIcon,
  VideoIcon
} from "lucide-react";

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

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

  // Mock data for learning progress (in real app, this would come from backend)
  const learningStats = {
    streak: 7,
    totalPracticeTime: 45,
    lessonsCompleted: 12,
    conversations: 8,
    weeklyGoal: 5,
    weeklyProgress: 3
  };

  const quickActions = [
    {
      icon: MessageCircleIcon,
      title: "Start Chat",
      description: "Message a language partner",
      color: "from-primary-500 to-primary-600",
      href: "/friends"
    },
    {
      icon: VideoIcon,
      title: "Video Call",
      description: "Practice speaking skills",
      color: "from-secondary-500 to-secondary-600",
      href: "/friends"
    },
    {
      icon: TargetIcon,
      title: "Set Goals",
      description: "Track your progress",
      color: "from-accent-500 to-accent-600",
      href: "/practice"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Welcome Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-lg text-white/90 font-body">
                  Ready to continue your language learning journey?
                </p>
              </div>
              <div className="flex gap-4">
                <Link to="/notifications" className="btn bg-white/20 hover:bg-white/30 text-white border-0">
                  <UsersIcon className="mr-2 size-4" />
                  Friend Requests
                </Link>
              </div>
            </div>
          </div>

          {/* Learning Progress Dashboard */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Learning Streak */}
            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <TrendingUpIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-primary-600">
                  {learningStats.streak}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Day Streak</h3>
              <p className="text-sm text-neutral-600 font-body">Keep it going!</p>
            </div>

            {/* Practice Time */}
            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-secondary-600">
                  {learningStats.totalPracticeTime}m
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Practice Time</h3>
              <p className="text-sm text-neutral-600 font-body">This week</p>
            </div>

            {/* Lessons Completed */}
            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
                  <AwardIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-accent-600">
                  {learningStats.lessonsCompleted}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Lessons Done</h3>
              <p className="text-sm text-neutral-600 font-body">Great progress!</p>
            </div>

            {/* Conversations */}
            <div className="card-lingualink p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-neutral-500 to-neutral-600 rounded-xl flex items-center justify-center">
                  <MessageCircleIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-heading font-bold text-neutral-600">
                  {learningStats.conversations}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-neutral-800 mb-1">Conversations</h3>
              <p className="text-sm text-neutral-600 font-body">This month</p>
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

          {/* Your Language Partners */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-2">Your Language Partners</h2>
                <p className="text-neutral-600 font-body">Connect with your friends and practice together</p>
              </div>
            </div>

            {loadingFriends ? (
              <div className="flex justify-center py-12">
                <div className="loading loading-spinner loading-lg text-primary-500"></div>
              </div>
            ) : friends.length === 0 ? (
              <NoFriendsFound />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {friends.map((friend) => (
                  <FriendCard key={friend._id} friend={friend} />
                ))}
              </div>
            )}
          </div>

          {/* Discover New Partners */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-2">Discover New Partners</h2>
              <p className="text-neutral-600 font-body">
                Find perfect language exchange partners based on your learning goals
              </p>
            </div>

            {loadingUsers ? (
              <div className="flex justify-center py-12">
                <div className="loading loading-spinner loading-lg text-primary-500"></div>
              </div>
            ) : recommendedUsers.length === 0 ? (
              <div className="card-lingualink p-8 text-center">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2 text-neutral-800">No recommendations available</h3>
                <p className="text-neutral-600 font-body">
                  Check back later for new language partners!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedUsers.map((user) => {
                  const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                  return (
                    <div
                      key={user._id}
                      className="card-lingualink hover:scale-105 transition-all duration-300"
                    >
                      <div className="p-5 space-y-4">
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
                        </div>

                        {/* Languages with flags */}
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

                        {user.bio && (
                          <p className="text-sm text-neutral-600 font-body line-clamp-2">{user.bio}</p>
                        )}

                        {/* Action button */}
                        <button
                          className={`w-full btn font-accent text-sm py-2 ${
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
                              <span className="truncate">Send Friend Request</span>
                            </>
                          )}
                        </button>
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

export default HomePage;
