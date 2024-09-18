import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { Button, TextField, Typography, Container } from "@mui/material";

const UpdatePost = ({ postId }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${postId}`);
        setTitle(response.data.title);
        setBody(response.data.body);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async () => {
    try {
      await api.put(`/posts/${postId}`, { title, body });
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Update Post</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Body"
        variant="outlined"
        fullWidth
        margin="normal"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <Button
        className="save-button"
        style={{ marginRight: "8px" }}
        variant="contained"
        color="primary"
        onClick={handleUpdate}
      >
        Update Post
      </Button>
    </Container>
  );
};

export default UpdatePost;
