import { createContext, useContext, useEffect, useState } from "react";

const ReviewsContext = createContext();

const REVIEWS_STORAGE_KEY = "reviews";

export function ReviewsProvider({ children }) {
  const [userReviews, setUserReviews] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(userReviews));
  }, [userReviews]);

  const addReview = (productId, review) => {
    setUserReviews((prev) => {
      const current = prev[productId] || [];
      return {
        ...prev,
        [productId]: [...current, review],
      };
    });
  };

  const getAllReviewsForProduct = (productId, apiReviews = []) => {
    const user = userReviews[productId] || [];
    return [...apiReviews, ...user];
  };

  const value = {
    addReview,
    getAllReviewsForProduct,
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
}

export function useReviews() {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error("useReviews must be used within ReviewsProvider");
  return ctx;
}