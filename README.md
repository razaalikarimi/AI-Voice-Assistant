# 🎙️ AI Voice Assistant

A state-of-the-art, conversational AI Voice Assistant built with the MERN stack (MongoDB, Express, React, Node.js) and powered by Google's Gemini API. This assistant is designed with a premium, modern Glassmorphism UI and comes with built-in voice recognition and speech synthesis capabilities.

## ✨ Features

- **🗣️ Advanced Voice Recognition:** Talk to the assistant directly using your microphone.
- **🤖 Conversational AI:** Powered by the Google Gemini model for intelligent, context-aware responses.
- **🔊 Speech Synthesis:** The assistant speaks back to you naturally (supports Hindi & English voices).
- **🌐 Web Automation Commands:** Easily trigger commands via voice to open Facebook, Instagram, YouTube, Calculator, or check the weather.
- **🎨 Premium UI/UX:** Completely custom frontend featuring soft gradients, glassmorphism, responsive dashboard layout, and smooth micro-animations.
- **🔐 Secure Authentication:** Full user authentication flow (Sign Up, Sign In) using JWT and encrypted passwords.
- **👤 Customization:** Users can name their assistant and choose/upload a custom avatar for a personalized experience.
- **📜 History Tracking:** The dashboard maintains a history of your recent commands and conversations.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS (Glassmorphism & Soft Gradients)
- **Routing:** React Router DOM
- **Icons:** React Icons

### Backend
- **Framework:** Node.js with Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **File Storage:** Cloudinary & Multer
- **AI Integration:** Google Gemini API

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine. You will also need a [Gemini API Key](https://aistudio.google.com/) and Cloudinary credentials.

### Installation

1. **Setup the Backend**
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

2. **Setup the Frontend**
```bash
cd ../frontend
npm install
```
Make sure the frontend is configured to talk to your backend server.

### Running the App

To run the application locally, you'll need two terminals:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## 💡 How to use
1. Create an account and sign in.
2. Choose your assistant's avatar and give it a name (e.g., "Nova").
3. Once on the dashboard, simply say your assistant's name to wake it up!
4. Ask questions, or try commands like *"Open YouTube"*, *"Show weather"*, or *"Open Instagram"*.

## 📄 License
This project is licensed under the MIT License.
