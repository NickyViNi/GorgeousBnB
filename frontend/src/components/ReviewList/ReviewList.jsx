// import { UseSelector } from "react-redux";
import ReviewTile from "./ReviewTile";
import './ReviewList.css';

export default function ReviewList ({currentSpot, reviews, reviewsAvgRating}) {

    const reviewsLength = reviews.length;
    return (
        <div className="review-list-container">
            <div id='reviews-star-rating'>
                <i className='fas fa-star'></i>
                <span id='ave-rating'>{reviewsAvgRating}</span>
                <span id='center-spot'>
                    {reviewsLength > 0 && <span>&#183;</span>}
                </span>
                {reviewsLength === 1 && <span>{reviewsLength} Review</span>}
                {reviewsLength > 1 && <span>{reviewsLength} Reviews</span>}
            </div>

            <div className="review-tile-container">
                {reviewsLength > 0 && reviews.sort((a, b) => b.id - a.id ).map(review => {
                    return (
                        <div key={review.id} >
                            <ReviewTile review={review} />
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
