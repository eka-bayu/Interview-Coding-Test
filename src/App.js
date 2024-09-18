import React from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "./components/postList";
import PostDetail from "./components/postDetail";
import CreatePost from "./components/createPost";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
};

export default App;
