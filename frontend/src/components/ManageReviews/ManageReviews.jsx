import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserReviewsThunk } from "../../store/review";
import { Navigate, useNavigate } from "react-router-dom";
import DeleteReviewButton from "../DeleteReviewModal/DeleteReviewButton";
import OpenModalButton from "../OpenModalButton";
import UpdateReviewModal from "../UpdateReviewModal/UpdateReviewModal";
import './ManageReviews.css';

export default function ManageReviews () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews.userReviews);
    const userReviewsArr = Object.values(reviews);
    userReviewsArr?.sort((a, b) => b.id - a.id );

    // console.log("Current user Reviews Array: ", userReviewsArr)

    useEffect( () => {

        dispatch(getCurrentUserReviewsThunk()).catch(async (res) => {
            const data = await res.json();
            console.error(data)
        })

    }, [dispatch])

    if(!sessionUser) {
        alert("Try to manage your reviews? Please log in your account!");
        return <Navigate to='/' replace={true} />
    }


    const generateStars = (review) => {
        const solidStar = <i className="fas fa-star solidStar single-star"/>
        const emptyStar = <i className="far fa-star emptyStar single-star"/>
        const stars = new Array(review.stars).fill(solidStar);
        for (let i = 0; i < 5 - review.stars; i++) {
            stars.push(emptyStar);
        }
        return stars;
    }

    return (
        <div className="current-user-reviews-container">
            <h1>Manage Your Reviews</h1>
            <div className="current-user-revirews-lists">
                {userReviewsArr.length > 0 ? userReviewsArr.map(review => {
                    return (
                        <div key={review.id} className="current-user-review-tile"  >
                            <img className='spot-image-name' src={review.Spot.previewImage} alt="Spot Image" onClick={()=> navigate(`/spots/${review.spotId}`) } title="Click to see spot details" />
                            <h3 className='spot-image-name'  onClick={()=> navigate(`/spots/${review.spotId}`) } title="Click to see spot details">{review.Spot.name}</h3>
                            <div className="review-date-stars">
                                <div className="review-date">{new Date(review.createdAt).toLocaleString(undefined, {month: 'long', year: 'numeric',})}</div>
                                <span id='separator-dot'>&#183;</span>
                                <div>
                                    {generateStars(review)}
                                </div>
                            </div>
                            <p>{review.review}</p>
                            <div className="manage-review-update-delete-btn">
                                <OpenModalButton
                                    modalComponent={<UpdateReviewModal review={review} />}
                                    buttonText='Update'
                                    buttonId='update-review-btn'
                                />
                                <DeleteReviewButton reviewId={review?.id} spotId={review?.spotId} />
                            </div>
                        </div>
                    )
                }) : <h2>{"Sorry, you don't have any review."}</h2> }
            </div>
        </div>
    )
}
