// ReviewWritePage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContextPro";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ReviewForm from "./ReviewForm";

const ReviewWritePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useLocalStorage("reviews", []);

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  const handleSubmit = (formValues) => {
    const newReview = {
      id: Date.now(), // 숫자 id 유지
      title: formValues.title.trim(),
      content: formValues.content.trim(),
      genre: formValues.genre,
      rating: Number(formValues.rating),
      likes: 0,
      writerId: currentUser.id,
      writerMbti: currentUser.mbti,
      createdAt: new Date().toISOString(),
    };

    setReviews([...reviews, newReview]);
    navigate(`/reviews/${newReview.id}`); // 또는 /reviews
  };

  return <ReviewForm mode="write" onSubmit={handleSubmit} />;
};

export default ReviewWritePage;
