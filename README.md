# AI Image Generator - MERN Stack

A full-stack web application that generates AI-powered images based on text prompts using the MERN (MongoDB, Express.js, React.js, Node.js) stack and Cloudinary for image storage.

## ✨ Features

- Generate unique AI images from text prompts
- Share your generated images with the community
- Browse and explore images created by other users
- Responsive design that works on desktop and mobile devices
- Modern UI with light/dark theme support

## 🚀 Tech Stack

- **Frontend**: React.js, Styled Components
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Cloud Storage**: Cloudinary
- **State Management**: React Context API
- **Styling**: Styled Components, CSS3

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for database)
- Cloudinary account (for image storage)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-image-generator-mern.git
cd ai-image-generator-mern
```

### 2. Set Up Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```env
   MONGODB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

### 3. Set Up Frontend

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open in your default browser at `http://localhost:3000`

## 📂 Project Structure

```
ai-image-generator-mern/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # React source files
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       └── App.js         # Main App component
├── server/                # Backend server
│   ├── controllers/       # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   └── index.js           # Server entry point
└── README.md              # Project documentation
```

## 🌐 API Endpoints

- `POST /api/generateImage` - Generate an image from text prompt
- `GET /api/post` - Get all posts
- `POST /api/post` - Create a new post

## 🔒 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI DALL-E](https://openai.com/dall-e-2/) for the AI image generation
- [Cloudinary](https://cloudinary.com/) for image storage and optimization
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for the database service

## 📧 Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - your.email@example.com

Project Link: [https://github.com/your-username/ai-image-generator-mern](https://github.com/your-username/ai-image-generator-mern)
