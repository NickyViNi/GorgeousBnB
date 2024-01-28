import { useSelector } from "react-redux";
import DeleteReviewButton from "../DeleteReviewModal/DeleteReviewButton";
import OpenModalButton from "../OpenModalButton";
import UpdateReviewModal from "../UpdateReviewModal/UpdateReviewModal";


export default function ReviewTile({review, name}) {

    const sessionUser = useSelector(state => state.session.user);

    const reviewMonthYear = new Date(review.createdAt).toLocaleString(undefined, {month: 'long', year: 'numeric',});
    // const reviewYear = new Date(review.createdAt).getFullYear();
    const solidStar = <i className="fas fa-star solidStar single-star"/>
    const emptyStar = <i className="far fa-star emptyStar single-star"/>
    const generateStars = () => {
        const stars = new Array(review.stars).fill(solidStar);
        for (let i = 0; i < 5 - review.stars; i++) {
            stars.push(emptyStar);
        }
        return stars;
    }
    review.Spot = {};
    review.Spot.name = name;

    console.log("lkhdskksksal......", review)



    return (
        <div className="review-tile">
            <h3>
                {review?.User?.firstName} <span>&#183;</span>
                {generateStars()}
            </h3>
            <h4>{reviewMonthYear}</h4>
            <p>{review?.review}</p>
            {/* {review.ReviewImages && review.ReviewImages.length > 0 && review.ReviewImages.map(image => <img className='review-image' key={image.id} src={image.url}></img>)} */}
            {sessionUser && sessionUser.id === review?.User?.id &&<div className="delete-update-btn-in-spot"> <DeleteReviewButton reviewId={review?.id} spotId={review?.spotId}/>
                    <OpenModalButton
                       modalComponent={<UpdateReviewModal review={review} />}
                       buttonText='Update'
                       buttonId='create-review-btn'
                    />
                </div>
            }
        </div>
    )
}
