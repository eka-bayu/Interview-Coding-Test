import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import api from "../api/axios";
import "../styles/createPost.css";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/posts", formData);

      alert("Post created successfully!");

      setFormData({
        title: "",
        body: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <Card className="create-post-card">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create New Post
        </Typography>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          variant="outlined"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Body"
          margin="normal"
          multiline
          rows={4}
          variant="outlined"
          name="body"
          value={formData.body}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
