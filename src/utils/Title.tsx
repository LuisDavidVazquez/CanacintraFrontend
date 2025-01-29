import React, { useEffect } from "react";

interface TitleProps {
  subtitle: string;
}

const Title: React.FC<TitleProps> = ({ subtitle }) => {
  
  useEffect(() => {
    document.title = `${subtitle} | Hydrop`;
  }, [subtitle]);

  return null; // No renderiza nada
};

export default Title;
