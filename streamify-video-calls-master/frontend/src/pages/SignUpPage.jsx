import { useState } from "react";
import { Link } from "react-router";
import {
  GlobeIcon, UsersIcon, MessageCircleIcon, VideoIcon,
  BookOpenIcon, TargetIcon, AwardIcon, StarIcon
} from "lucide-react";
import LinguaLinkLogo from "../components/LinguaLinkLogo";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  const features = [
    {
      icon: GlobeIcon,
      title: "Global Language Exchange",
      description: "Connect with native speakers from around the world"
    },
    {
      icon: MessageCircleIcon,
      title: "Real-time Chat",
      description: "Practice languages through instant messaging"
    },
    {
      icon: VideoIcon,
      title: "Video Calls",
      description: "Face-to-face conversations for authentic learning"
    },
    {
      icon: BookOpenIcon,
      title: "Structured Learning",
      description: "Organized lessons and progress tracking"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Signup Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <LinguaLinkLogo size="large" className="justify-center mb-4" />
              <h1 className="text-3xl font-heading font-bold text-neutral-800 mb-2">Join LinguaLink</h1>
              <p className="text-neutral-600 font-body">Start your language learning journey today</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error mb-6">
                <span className="font-body">{error.response?.data?.message || error.message}</span>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-body"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-body"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-body"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="w-full btn-lingualink font-accent text-lg py-4" 
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>

              <div className="text-center">
                <p className="text-neutral-600 font-body">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right Side - Features & Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 floating-animation"></div>
              <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-200 rounded-full opacity-20 floating-animation" style={{ animationDelay: '2s' }}></div>
              <div className="absolute top-1/2 left-5 w-12 h-12 bg-accent-200 rounded-full opacity-20 floating-animation" style={{ animationDelay: '4s' }}></div>

              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-4">Where Languages Connect, Cultures Unite</h2>
                  <p className="text-neutral-600 font-body">Join millions of learners worldwide in the most authentic way to master languages</p>
                </div>

                {/* Features */}
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-semibold text-neutral-800 mb-1 line-clamp-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-neutral-600 font-body line-clamp-2">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Stats */}
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-heading font-bold text-primary-600">10K+</div>
                      <div className="text-xs text-neutral-500 font-body">Active Learners</div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-secondary-600">50+</div>
                      <div className="text-xs text-neutral-500 font-body">Languages</div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-accent-600">24/7</div>
                      <div className="text-xs text-neutral-500 font-body">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
