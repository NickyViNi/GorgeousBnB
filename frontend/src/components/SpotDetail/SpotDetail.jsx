import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './SpotDetail.css';
import { getSpotByIdThunk } from '../../store/spots';
import { getReviewsBySpotIdThunk } from '../../store/review';
import SpotImagesList from './SpotImageList';

function SpotDetail () {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    // const spot = useSelector(state => state.spots.allSpots[spotId]);
    const currentSpot = useSelector(state => state.spots.currentSpot);
    const currSpotReviews = useSelector(state => state.reviews.spotReviews);

    const reviewsArr = Object.values(currSpotReviews);
    const currSpotAvgRating = reviewsArr.reduce((accumulator, currReview) => accumulator + currReview.stars, 0) / reviewsArr.length;

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
        </div>
    )
}

export default SpotDetail;
