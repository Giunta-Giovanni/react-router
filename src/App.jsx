// importa React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importa le pagine
import HomePage from "./route/HomePage";
import AboutPage from "./route/AboutPage";
import PostsPage from "./route/PostsPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}