import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageCircleIcon, VideoIcon, MapPinIcon } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="card-lingualink hover:scale-105 transition-all duration-300 group">
      <div className="p-4">
        {/* USER INFO */}
        <div className="flex items-start gap-3 mb-3">
          <div className="avatar flex-shrink-0">
            <div className="w-12 h-12 rounded-full ring-2 ring-primary-100 group-hover:ring-primary-200 transition-all">
              <img src={friend.profilePic} alt={friend.fullName} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-neutral-800 truncate text-sm">{friend.fullName}</h3>
            {friend.location && (
              <div className="flex items-center text-xs text-neutral-500 mt-1 font-body">
                <MapPinIcon className="size-3 mr-1 flex-shrink-0" />
                <span className="truncate">{friend.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-primary badge-outline text-xs font-body px-2 py-1">
            {getLanguageFlag(friend.nativeLanguage)}
            <span className="truncate">Native: {friend.nativeLanguage}</span>
          </span>
          <span className="badge badge-secondary badge-outline text-xs font-body px-2 py-1">
            {getLanguageFlag(friend.learningLanguage)}
            <span className="truncate">Learning: {friend.learningLanguage}</span>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link 
            to={`/chat/${friend._id}`} 
            className="flex-1 btn btn-outline btn-xs font-accent hover:bg-primary-50 hover:border-primary-300 transition-colors min-w-0"
          >
            <MessageCircleIcon className="size-3 mr-1 flex-shrink-0" />
            <span className="truncate">Message</span>
          </Link>
          <Link 
            to={`/call/${friend._id}`} 
            className="flex-1 btn btn-outline btn-xs font-accent hover:bg-secondary-50 hover:border-secondary-300 transition-colors min-w-0"
          >
            <VideoIcon className="size-3 mr-1 flex-shrink-0" />
            <span className="truncate">Call</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block flex-shrink-0"
      />
    );
  }
  return null;
}
