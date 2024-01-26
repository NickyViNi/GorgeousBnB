import { useSelector } from "react-redux";
import DeleteReviewButton from "../DeleteReviewModal/DeleteReviewButton";


export default function ReviewTile({review}) {

    const sessionUser = useSelector(state => state.session.user);

    const reviewMonthYear = new Date(review.createdAt).toLocaleString(undefined, {month: 'long', year: 'numeric',});
    // const reviewYear = new Date(review.createdAt).getFullYear();
    const solidStar = <i className="fas fa-star solidStar"/>
    const emptyStar = <i className="far fa-star emptyStar"/>
    const generateStars = () => {
        const stars = new Array(review.stars).fill(solidStar);
        for (let i = 0; i < 5 - review.stars; i++) {
            stars.push(emptyStar);
        }
        return stars;
    }



    return (
        <div className="review-tile">
            <h3>
                {review?.User.firstName} <span>&#183;</span>
                {generateStars()}
            </h3>
            <h4>{reviewMonthYear}</h4>
            <p>{review?.review}</p>
            {/* {review.ReviewImages && review.ReviewImages.length > 0 && review.ReviewImages.map(image => <img className='review-image' key={image.id} src={image.url}></img>)} */}
            {sessionUser && sessionUser.id === review?.User.id && <DeleteReviewButton reviewId={review?.id} spotId={review?.spotId}/>}
        </div>
    )
}
