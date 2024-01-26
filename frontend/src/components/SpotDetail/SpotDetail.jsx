import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './SpotDetail.css';
import { getSpotByIdThunk } from '../../store/spots';
import { getReviewsBySpotIdThunk } from '../../store/review';
import SpotImagesList from './SpotImageList';
import ReviewList from '../ReviewList/ReviewList';

function SpotDetail () {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    // const spot = useSelector(state => state.spots.allSpots[spotId]);
    const currentSpot = useSelector(state => state.spots.currentSpot);
    const currSpotReviews = useSelector(state => state.reviews.spotReviews);

    const reviewsArr = Object.values(currSpotReviews);
    const reviewsLength = reviewsArr.length;

    let currSpotAvgRating = 'New';
    if (reviewsLength) {
        currSpotAvgRating =parseFloat(reviewsArr.reduce((accumulator, currReview) => accumulator + currReview.stars, 0) / reviewsLength).toFixed(1);
    }

    useEffect(() => {
        dispatch(getSpotByIdThunk(parseInt(spotId)));
        dispatch(getReviewsBySpotIdThunk(parseInt(spotId)));
    }, [dispatch, spotId]);

    if (!currentSpot || !currSpotReviews) {
        return null;
    }

    //reserve button alert:
    const reserveAlert = () => {
        alert("Feature Coming Soon...");
    }

    return (
        <div className='spot-detail-container'>
            <h1 id='spot-name'>{currentSpot.name}</h1>
            <div id='spot-location'>
                <h3>{currentSpot.city}, {currentSpot.state}, {currentSpot.country}</h3>
            </div>
            <SpotImagesList spotImages={currentSpot.SpotImages} />

            <div id='spot-callout-container' >
                <div id='spot-details-container' >
                    <div id='spot-owner-info' >
                        <h2>Hosted by {currentSpot.Owner.firstName} {currentSpot.Owner.lastName}</h2>
                    </div>
                    <div id='spot-description' >
                        <p>{currentSpot.description}</p>
                    </div>
                </div>

                <div className='spot-callout-info' >
                    <div id='price-reviews-container'>
                        <div id='spot-price'>
                            <h3>${currentSpot.price}</h3>
                            <span>night</span>
                        </div>
                        <div id='star-rating'>
                            <i className='fas fa-star single-star'></i>
                            <span id='ave-rating'>{currSpotAvgRating}</span>
                            <span id='center-spot'>
                                {reviewsLength > 0 && <span>&#183;</span>}
                            </span>
                            {reviewsLength === 1 && <span>{reviewsLength} Review</span>}
                            {reviewsLength > 1 && <span>{reviewsLength} Reviews</span>}
                        </div>
                    </div>
                    <button onClick={reserveAlert} id='reserve-button'>
                        Reserve
                    </button>
                </div>
            </div>

            <div className='separator'></div>

            <ReviewList currentSpot={currentSpot} reviews={reviewsArr} reviewsAvgRating={currSpotAvgRating} />
        </div>
    )
}

export default SpotDetail;
