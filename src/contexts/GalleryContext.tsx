import React, { createContext, useContext, useState, ReactNode } from "react";

interface ImageContextData {
  images: string[];
  handleImageUpload: (newImage: string) => void;
}

const ImageContext = createContext<ImageContextData | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (newImage: string) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  console.log(images);

  return (
    <ImageContext.Provider value={{ images, handleImageUpload }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = (): ImageContextData => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
};
