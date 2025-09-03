import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AutoAwesome, CreateRounded, Info } from "@mui/icons-material";
import TextInput from "../Input/TextInput";
import Button from "../buttons/button";
import { CreatePost, GenerateImageFromPrompt } from "../../api";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const InfoBox = styled.div`
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  margin: 8px 0;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  background: rgba(39, 174, 96, 0.1);
  border: 1px solid rgba(39, 174, 96, 0.3);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 14px;
  margin: 8px 0;
`;

const GenerateImage = ({
  createPostLoading,
  setcreatePostLoading,
  generateImageLoading,
  setGenerateImageLoading,
  post,
  setPost,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const generateImage = async () => {
    if (!post.prompt.trim()) {
      setError("Please enter a prompt to generate an image");
      return;
    }

    setGenerateImageLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await GenerateImageFromPrompt({ prompt: post.prompt });
      
      if (response?.data?.photo) {
        // The backend now returns the complete data URL
        const imageData = response.data.photo;
        
        // Check if it's already a data URL
        if (imageData.startsWith('data:')) {
          setPost({
            ...post,
            photo: imageData,
          });
        } else {
          // Fallback: add data URL prefix
          setPost({
            ...post,
            photo: `data:image/jpeg;base64,${imageData}`,
          });
        }
        
        setSuccess("Image generated successfully! You can now post it to the community.");
        console.log("✅ Image set successfully, length:", imageData.length);
      } else {
        throw new Error("No image data received");
      }
    } catch (error) {
      console.error("Image generation error:", error);
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Failed to generate image. Please try again.";
      setError(errorMessage);
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createPost = async () => {
    if (!post.name.trim() || !post.photo || !post.prompt.trim()) {
      setError("Please fill in all required fields and generate an image first");
      return;
    }

    setcreatePostLoading(true);
    setError("");
    setSuccess("");

    try {
      await CreatePost(post);
      setSuccess("Post created successfully! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Create post error:", error);
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          "Failed to create post. Please try again.";
      setError(errorMessage);
    } finally {
      setcreatePostLoading(false);
    }
  };

  const handlePromptChange = (e) => {
    setPost({ ...post, prompt: e.target.value });
    // Clear messages when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with AI</Title>
        <Desc>
          Write a detailed prompt to generate a unique image using our free AI service!
        </Desc>
        <InfoBox>
          <Info style={{ fontSize: '16px' }} />
          <span>
            <strong>Tip:</strong> Be specific in your description. For example: 
            "A serene mountain landscape at sunset with golden clouds" works better than just "mountain".
          </span>
        </InfoBox>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Describe the image you want to generate in detail..."
          name="prompt"
          textArea
          rows="8"
          value={post.prompt}
          handelChange={handlePromptChange}
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <div style={{ fontSize: '12px', color: '#666' }}>
          * You can post the AI Generated Image to showcase in the community!
        </div>
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          flex
          isLoading={generateImageLoading}
          isDisabled={!post.prompt.trim()}
          onClick={generateImage}
        />
        <Button
          text="Post Image"
          leftIcon={<CreateRounded />}
          type="secondary"
          flex
          isDisabled={
            !post.name.trim() || !post.photo || !post.prompt.trim()
          }
          isLoading={createPostLoading}
          onClick={createPost}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImage;
