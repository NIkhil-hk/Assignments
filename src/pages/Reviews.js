import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firebase auth and db
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import ReactStars from "react-stars";

const ReviewsPage = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("Please login to submit a review.");
      navigate("/login");
      return;
    }

    if (rating === 0 || feedback.trim() === "") {
      setError("Please provide a rating and feedback before submitting.");
      return;
    }

    const reviewData = {
      name: user.displayName || "Anonymous",
      email: user.email,
      rating: rating,
      feedback: feedback.trim(),
      timestamp: serverTimestamp(), // Accurate server-side timestamp
    };

    try {
      await addDoc(collection(db, "reviews"), reviewData);
      alert("Review submitted successfully!");
      setRating(0); // Reset the rating
      setFeedback(""); // Clear the feedback
      setError(""); // Clear any existing error
    } catch (error) {
      console.error("Error adding review: ", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Submit Your Review</h2>
        <form onSubmit={handleSubmit}>
          {/* Rating Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
            <ReactStars
              count={5}
              size={40}
              value={rating}
              onChange={setRating}
              half={false}
              color2={"#ffd700"}
            />
          </div>

          {/* Feedback Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Your Feedback</label>
            <textarea
              className="w-full border rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
      <button
        onClick={() => navigate("/summary")}
        className="fixed bottom-4 bg-blue-500 text-white px-40 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
      >
        See Ratings
      </button>
    </div>
  );
};

export default ReviewsPage;
