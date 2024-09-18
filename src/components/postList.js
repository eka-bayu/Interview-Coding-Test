import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/postSlice";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import "../styles/postList.css";
import CreatePost from "./createPost";

const PostList = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  return (
    <Container>
      <CreatePost />
      {status === "loading" && <CircularProgress />}
      {status === "failed" && (
        <Typography color="error">Failed to load posts!</Typography>
      )}
      {status === "succeeded" && (
        <div className="card-container">
          {list.map((post) => (
            <div className="card-item" key={post.id}>
              <Card className="card-content">
                <CardContent>
                  <Typography variant="h6">{post.title}</Typography>
                  <Typography variant="body2">{post.body}</Typography>
                  <Link to={`/post/${post.id}`}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 1 }}
                    >
                      Read More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default PostList;
