import React from 'react';

interface ImageWithAltProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  [key: string]: any;
}

const ImageWithAlt: React.FC<ImageWithAltProps> = ({ 
  src, 
  alt, 
  className = '',
  loading = 'lazy',
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      {...props}
    />
  );
};

export default ImageWithAlt;