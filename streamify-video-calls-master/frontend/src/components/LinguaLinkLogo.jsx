import React from 'react';

const LinguaLinkLogo = ({ size = 'default', showText = true, className = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-9 h-9',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-lg',
    default: 'text-2xl',
    large: 'text-3xl',
    xlarge: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Logo Icon - Interconnected Speech Bubbles */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Main speech bubble */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-lg"></div>
        
        {/* Connected speech bubbles */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary-400 rounded-full animate-bounce-slow"></div>
        
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 36 36">
          <path
            d="M18 18 L27 9 M18 18 L9 27"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
        
        {/* Globe grid pattern */}
        <div className="absolute inset-1 bg-white/20 rounded-full flex items-center justify-center">
          <div className="w-1/2 h-1/2 border border-white/30 rounded-full"></div>
        </div>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`font-heading font-bold gradient-text ${textSizes[size]} tracking-wide`}>
          LinguaLink
        </span>
      )}
    </div>
  );
};

export default LinguaLinkLogo; 