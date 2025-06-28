import axios from "axios";

// http://localhost:5000/api/
const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateImageFromPrompt = async (data) =>
  await API.post("/generateImage/", data);
