// src/components/ReviewEditPage.jsx
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/AuthContextPro";
import { useLocalStorage } from "../hooks/useLocalStorage";
import ReviewForm from "./ReviewForm";

const ReviewEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useLocalStorage("reviews", []);

  const reviewId = Number(id);
  const reviewData = reviews.find((r) => r.id === reviewId);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (!reviewData) {
      alert("존재하지 않는 게시글입니다.");
      navigate("/reviews");
      return;
    }

    if (reviewData.writerId !== currentUser.id) {
      alert("본인 글만 수정할 수 있습니다.");
      navigate(`/reviews/${reviewId}`);
    }
  }, [currentUser, reviewData, reviewId, navigate]);

  const handleEditSubmit = (formValues) => {
    const updatedReviews = reviews.map((r) =>
      r.id === reviewId
        ? {
            ...r,
            title: formValues.title.trim(),
            content: formValues.content.trim(),
            genre: formValues.genre,
            rating: Number(formValues.rating),
            updatedAt: new Date().toISOString(),
          }
        : r
    );

    setReviews(updatedReviews);
    alert("게시글 수정을 완료했습니다.")
    navigate(`/reviews/${reviewId}`);
  };

  if (!reviewData) return null;

  return (
    <ReviewForm
      mode="edit"
      initialValues={{
        title: reviewData.title,
        content: reviewData.content,
        genre: reviewData.genre,
        rating: reviewData.rating,
      }}
      onSubmit={handleEditSubmit}
    />
  );
};

export default ReviewEditPage;
