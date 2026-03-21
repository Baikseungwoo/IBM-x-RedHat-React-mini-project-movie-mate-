import { generateMbtiSeedReviews } from "../data/generateMbtiSeedReviews";

const REVIEWS_KEY = "reviews";
const LIKE_KEY = "like";

export const initLocalStorage = () => {
  try {
    const reviews = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");

    // reviews가 비어있을 때만 80개 삽입
    if (!Array.isArray(reviews) || reviews.length === 0) {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(generateMbtiSeedReviews()));
    }

    // like 키가 없으면 빈 배열로 초기화
    if (!localStorage.getItem(LIKE_KEY)) {
      localStorage.setItem(LIKE_KEY, JSON.stringify([]));
    }
  } catch (e) {
    console.error("initLocalStorage error:", e);
  }
};