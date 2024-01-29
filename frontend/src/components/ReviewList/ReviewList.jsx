import { useSelector } from "react-redux";
import ReviewTile from "./ReviewTile";
import './ReviewList.css';
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";

export default function ReviewList ({ reviews, reviewsAvgRating, currentSpot}) {
    // const spotReviews = useSelector(state => state.reviews.spotReviews);
    const sessionUser = useSelector(state => state.session.user);

    const reviewsLength = reviews.length;

    return (
        <div className="review-list-container">
            <div id='reviews-star-rating'>
                <i className='fas fa-star single-star'></i>
                <span id='ave-rating'>{reviewsAvgRating}</span>
                <span id='center-spot'>
                    {reviewsLength > 0 && <span>&#183;</span>}
                </span>
                {reviewsLength === 1 && <span>{reviewsLength} Review</span>}
                {reviewsLength > 1 && <span>{reviewsLength} Reviews</span>}
            </div>

            {
                sessionUser
                && !reviews.find(rev => rev.userId === sessionUser.id)
                && currentSpot.ownerId !== sessionUser.id
                && (<span>
                    <OpenModalButton
                        modalComponent={<CreateReviewModal />}
                        buttonText='Post Your Review'
                        buttonId='create-review-btn'
                    />
                </span>)
            }
            {
                reviews.length === 0 && sessionUser && currentSpot.ownerId !== sessionUser.id && <h4>Be the first to post a review!</h4>
            }
            <div className="review-tile-container">
                {reviewsLength > 0 && reviews.sort((a, b) => b.id - a.id ).map(review => {
                    return (
                        <div key={review.id} >
                            <ReviewTile review={review} name={currentSpot.name}/>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}
