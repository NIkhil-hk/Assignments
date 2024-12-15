import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom"; // For navigation
import ReactStars from "react-stars";

const ReviewSummaryPage = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Query reviews in descending order by timestamp
        const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const reviewList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(reviewList);

        // Calculate the average rating
        const totalRating = reviewList.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        setAverageRating(reviewList.length ? totalRating / reviewList.length : 0);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Overall Rating Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Overall Rating</h2>
          <div className="flex flex-col items-center">
            <ReactStars
              count={5}
              value={averageRating}
              size={40}
              edit={false}
              color2={"#ffd700"}
            />
            <p className="text-xl mt-2 font-semibold">
              {averageRating.toFixed(1)} / 5
            </p>
          </div>
        </div>

        {/* List of Reviews */}
        <div>
          <h3 className="text-xl font-bold mb-4">All Reviews</h3>
          <div className="space-y-4">
            {reviews.length ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {review.name || "Anonymous"}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {review.timestamp?.toDate().toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      color2={"#ffd700"}
                    />
                  </div>
                  <p className="text-gray-700">{review.feedback}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
          
        </div>
        
      </div>

      {/* Fixed Button to Submit Review */}
      <div className="flex items-centre justify-center"> 
      <button
        onClick={() => navigate("/reviews")}
        className="fixed bottom-4 bg-blue-500 text-white px-40 py-3 rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
      >
        Write a Review
      </button>
      </div>
      
    </div>
    
  );
};

export default ReviewSummaryPage;
