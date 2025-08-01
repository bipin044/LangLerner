import { useState } from "react";
import { Link } from "react-router";
import { EyeIcon, EyeOffIcon, GlobeIcon, UsersIcon, BookOpenIcon } from "lucide-react";
import useLogin from "../hooks/useLogin";
import LinguaLinkLogo from "../components/LinguaLinkLogo";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  const features = [
    {
      icon: GlobeIcon,
      title: "Global Connections",
      description: "Connect with native speakers from around the world"
    },
    {
      icon: UsersIcon,
      title: "Cultural Exchange",
      description: "Learn languages through authentic cultural experiences"
    },
    {
      icon: BookOpenIcon,
      title: "Structured Learning",
      description: "Progress through personalized learning paths"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Side - Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            {/* Logo and Header */}
            <div className="text-center mb-8">
              <LinguaLinkLogo size="large" className="justify-center mb-4" />
              <h1 className="text-3xl font-heading font-bold text-neutral-800 mb-2">
                Welcome Back
              </h1>
              <p className="text-neutral-600 font-body">
                Continue your language learning journey with LinguaLink
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700 text-sm font-medium">
                  {error.response?.data?.message || "An error occurred. Please try again."}
                </p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-body"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-12 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 font-body"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-lingualink font-accent text-lg py-4"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <div className="loading loading-spinner loading-sm"></div>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center">
                <p className="text-neutral-600 font-body">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium hover:underline transition-colors">
                    Create one
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right Side - Features & Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Elements */}
              <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-20 floating-animation"></div>
              <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-br from-accent-400 to-primary-400 rounded-full opacity-30 floating-animation" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full opacity-25 floating-animation" style={{ animationDelay: '4s' }}></div>

              {/* Main Content */}
              <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-heading font-bold text-neutral-800 mb-4">
                    Where Languages Connect, Cultures Unite
                  </h2>
                  <p className="text-neutral-600 font-body">
                    Join millions of learners worldwide in the most authentic way to master languages
                  </p>
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
                      <div className="text-2xl font-heading font-bold text-primary-600">50K+</div>
                      <div className="text-xs text-neutral-500 font-body">Active Learners</div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-secondary-600">120+</div>
                      <div className="text-xs text-neutral-500 font-body">Languages</div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-accent-600">1M+</div>
                      <div className="text-xs text-neutral-500 font-body">Connections Made</div>
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

export default LoginPage;
