import React, { useState, useEffect } from 'react';
import './ReviewSection.css';
import { Card, CardContent, Typography, Box } from '@mui/material';

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
    setReviews(storedReviews);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { name, rating, comment, date: new Date().toLocaleDateString() };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    setName('');
    setRating(5);
    setComment('');
  };

  return (
    <div className="review-section">
      <h2>User Reviews</h2>
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map((r) => (
            <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
          ))}
        </select>
        <textarea
          placeholder="Your Review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <Box className="reviews-list" display="flex" flexDirection="column" gap={2}>
        {reviews.length === 0 ? (
          <Typography>No reviews yet. Be the first to review!</Typography>
        ) : (
          reviews.map((review, idx) => (
            <Card key={idx} className="review-card" variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6">{review.name}</Typography>
                  <Typography color="primary">{review.rating}★</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {review.date}
                </Typography>
                <Typography variant="body1">{review.comment}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
};

export default ReviewSection; 