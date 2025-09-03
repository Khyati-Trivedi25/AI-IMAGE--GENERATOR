import { CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow + 90};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 400px;
  background: ${({ theme }) => theme.black + 50};
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  font-size: 14px;
  padding: 16px;
`;

const PlaceholderText = styled.div`
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  padding: 20px;
`;

const GeneratedImageCard = ({ src, loading }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset states when src changes
  useEffect(() => {
    if (src) {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src]);

  const handleImageError = (e) => {
    console.error("Failed to load image:", e);
    console.error("Image src:", src ? src.substring(0, 100) + "..." : "No src");
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    console.log("✅ Image loaded successfully");
    setImageError(false);
    setImageLoaded(true);
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress
          sx={{ color: "inherit", width: "24px", height: "24px" }}
        />
        <span>Generating Your Image...</span>
      </Container>
    );
  }

  if (imageError) {
    return (
      <Container>
        <ErrorMessage>
          <div>⚠️ Image failed to load</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>
            Try generating a new image
          </div>
          <div style={{ fontSize: '10px', marginTop: '4px', opacity: 0.7 }}>
            Debug: {src ? `Data length: ${src.length}` : 'No data'}
          </div>
        </ErrorMessage>
      </Container>
    );
  }

  if (src && src.trim()) {
    return (
      <Container>
        <Image 
          src={src} 
          alt="Generated AI Image"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
        {!imageLoaded && !imageError && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress size={20} />
            <div style={{ marginTop: '8px', fontSize: '12px' }}>Loading image...</div>
          </div>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <PlaceholderText>
        <div>🎨</div>
        <div style={{ marginTop: '8px' }}>Write a prompt to generate image</div>
        <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.7 }}>
          Be specific for better results!
        </div>
      </PlaceholderText>
    </Container>
  );
};

export default GeneratedImageCard;
