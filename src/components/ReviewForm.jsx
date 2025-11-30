import { useState } from "react";

function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit({
      rating: Number(rating),
      text,
      reviewerName: name || "Anonymous",
      date: new Date().toISOString(),
      source: "user",
    });

    setRating(5);
    setText("");
    setName("");
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Add a Review</h3>
      <label>
        Rating
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>

      <label>
        Your name (optional)
        <input
          type="text"
          value={name}
          placeholder="Anonymous"
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Review
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          required
        />
      </label>

      <button type="submit" className="btn primary">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;