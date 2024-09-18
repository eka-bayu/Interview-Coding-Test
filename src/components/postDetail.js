import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Box,
} from "@mui/material";
import api from "../api/axios";
import { fetchPostById, updatePost, deletePost } from "../redux/postSlice";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedPost, status } = useSelector((state) => state.posts);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPostById(id));
    }
  }, [id, status, dispatch]);

  useEffect(() => {
    if (selectedPost) {
      setFormData({
        title: selectedPost.title,
        body: selectedPost.body,
      });
    }
  }, [selectedPost]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/posts/${id}`, formData);
      dispatch(updatePost({ id, ...formData }));
      setEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      dispatch(deletePost(id));
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Container>
      {status === "loading" && <CircularProgress />}
      {status === "failed" && (
        <Typography color="error">Failed to load post!</Typography>
      )}
      {status === "succeeded" && (
        <Card variant="outlined">
          <CardContent>
            {editing ? (
              <div>
                <TextField
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.title}
                  onChange={handleChange}
                />
                <TextField
                  name="body"
                  label="Body"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={formData.body}
                  onChange={handleChange}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ marginLeft: 1 }}
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                </Box>
              </div>
            ) : (
              <div>
                <Typography variant="h6">{selectedPost.title}</Typography>
                <Typography variant="body2">{selectedPost.body}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditClick}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Box>
              </div>
            )}
            {!editing && (
              <Link to="/">
                <Button variant="text" color="secondary" sx={{ marginTop: 2 }}>
                  Back
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default PostDetail;
