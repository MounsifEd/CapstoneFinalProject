function RatingStars({ rating }) {
  if (!rating) return <span>No rating</span>;

  const fullStars = Math.round(rating);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < fullStars ? "★" : "☆"
  );

  return (
    <span className="rating-stars">
      {stars.join(" ")} <span className="rating-value">({rating.toFixed(1)})</span>
    </span>
  );
}

export default RatingStars;