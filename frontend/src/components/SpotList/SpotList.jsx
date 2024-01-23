import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { loadSpotsThunk } from '../../store/spots';

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
                    <div key={spot.id}>
                        <div >{spot.name}</div>
                        <img  src={spot.previewImage} />
                    </div>
                )
            })}
        </div>
    )
}

export default SpotList;
