import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './SpotDetail.css';
import { getSpotByIdThunk } from '../../store/spots';
import { getReviewsBySpotIdThunk } from '../../store/review';

function SpotDetail () {

    const dispatch = useDispatch();
    const { spotId } = useParams();
    // const spot = useSelector(state => state.spots.allSpots[spotId]);
    const currentSpot = useSelector(state => state.spot.currentSpot);
    const currSpotReviews = useSelector(state => state.reviews.spotReviews);

    const reviewsArr = Object.values(currSpotReviews);
    const currSpotAvgRating = reviewsArr.reduce((accumulator, currReview) => accumulator + currReview.stars, 0) / reviewsArr.length;

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId));
        dispatch(getReviewsBySpotIdThunk(spotId));
    }, [dispatch, spotId]);

    if (!currentSpot || !currSpotReviews) {
        return null;
    }

    //reserve button alert:
    const reserveAlert = () => {
        alert("Feature Coming Soon...");
    }


    return (
        <h1>hi</h1>
    )
}

export default SpotDetail;
