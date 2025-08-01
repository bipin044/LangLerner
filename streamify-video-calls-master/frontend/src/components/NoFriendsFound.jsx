import { UsersIcon, GlobeIcon, MessageCircleIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="card-lingualink p-8 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <UsersIcon className="w-10 h-10 text-primary-600" />
      </div>
      <h3 className="font-heading font-semibold text-xl mb-3 text-neutral-800">
        No language partners yet
      </h3>
      <p className="text-neutral-600 font-body mb-6 max-w-md mx-auto">
        Start your language learning journey by connecting with native speakers from around the world!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div className="flex items-center gap-2 text-sm text-neutral-500 font-body">
          <GlobeIcon className="size-4" />
          <span>Discover new partners</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500 font-body">
          <MessageCircleIcon className="size-4" />
          <span>Start conversations</span>
        </div>
      </div>
    </div>
  );
};

export default NoFriendsFound;
