
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <img 
      src="/lovable-uploads/04ec7c9f-dc78-4e4b-8eb3-26b186547395.png" 
      alt="Nosso Atacarejo" 
      className={className} 
    />
  );
};

export default Logo;
