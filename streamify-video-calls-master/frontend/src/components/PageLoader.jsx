import { LoaderIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import LinguaLinkLogo from "./LinguaLinkLogo";

const PageLoader = () => {
  const { theme } = useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-white" data-theme={theme}>
      <div className="text-center">
        <div className="mb-6">
          <LinguaLinkLogo size="large" className="justify-center" />
        </div>
        <div className="flex items-center justify-center gap-3">
          <LoaderIcon className="animate-spin size-6 text-primary-500" />
          <span className="text-neutral-600 font-body">Loading your language journey...</span>
        </div>
      </div>
    </div>
  );
};
export default PageLoader;
