import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { loadSpotsThunk } from '../../store/spots';
import SpotTile from './SpotTile';
import './SpotList.css';

const SpotList = () => {
    const dispatch = useDispatch();
    const allSpotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(allSpotsObj);

    useEffect(() => {
        dispatch(loadSpotsThunk())
    }, [dispatch])

    return (
        <div id='spot-list-container'>
            {spots.map(spot => {
                return (
                    <SpotTile key={spot.id} spot={spot} />
                )
            })}
        </div>
    )
}

export default SpotList;
