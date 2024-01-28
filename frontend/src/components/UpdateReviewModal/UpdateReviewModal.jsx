import { useState } from "react";
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { updateReviewThunk } from "../../store/review";

export default function UpdateReviewModal ({review}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [reviewText, setReviewText] = useState(review.review);
    const [selectedStars, setSelectedStars] = useState(review.stars);
    const [hoverStars, setHoverStars] = useState(0);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReview = {
            review: reviewText,
            stars: selectedStars
        }
        try {
            dispatch(updateReviewThunk(review.id, newReview)).then(closeModal);
        } catch (e) {
            setErrors(e);
            console.error('update review error: ', e);
        }
    }

    const renderStar = (index) => {
        return (
          <div
          className={ (index <=  hoverStars) ? 'filled' : 'empty' }
          onMouseEnter={() => setHoverStars(index)}
          onMouseLeave={() => setHoverStars(selectedStars)}
          onClick={() => setSelectedStars(index)}
          key={index}
          >
            <i className="fa fa-star emptyStar"></i>
          </div>
        )
      }





    return (
        <div id='create-review-form-container'>
            <h1 id='create-review-h1'>How was your stay?</h1>
            {errors.length > 0 && <span id='create-review-errors'>{errors}</span> }
            <form id='create-review-form' onSubmit={handleSubmit}>
                <textarea
                    id='create-review-textarea'
                    placeholder="Leave your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />

                <div className='review-rating-input' >
                    {Array.from({length: 5}, (_k, i) => renderStar(i+1))}
                    <span id='review-form-stars-text'>Stars</span>
                </div>

                <button id='create-review-form-button' disabled={reviewText.length < 10 || selectedStars < 1} >Update Your Review</button>
            </form>
        </div>
    )
}
