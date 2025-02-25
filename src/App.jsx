// importa React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importa i layout
import DefaultLayout from "./components/DefaultLayout";

// importa le pagine
import HomePage from "./route/HomePage";
import AboutPage from "./route/AboutPage";
import PostsPage from "./route/PostsPage";
import AddPostPage from "./route/AddPostPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/addpost" element={<AddPostPage />} />


        </Route>

      </Routes>
    </BrowserRouter>
  );
}