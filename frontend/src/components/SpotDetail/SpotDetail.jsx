import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function SpotDetail () {

    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.allSpots[spotId]);


    return (
        <h1>{spot.name}</h1>
    )
}

export default SpotDetail;
