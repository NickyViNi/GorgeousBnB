import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getSpotByUserThunk } from "../../store/spots";
import ManageSpotTile from "./ManageSpotTile";
import './ManageSpotsList.css';

export default function ManageSpotsList () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userSpots = useSelector(state => state.spots.userSpots);
    const userSpotsArr = Object.values(userSpots);

    useEffect(() => {
        dispatch(getSpotByUserThunk()).catch(async (res) => {
            const data = await res.json();
            return data;
        })
    }, [dispatch]);

    if (!sessionUser) {
        window.alert("Try to manage your spots? Please log in your account!");
        return <Navigate to='/' replace={true} />
    }

    return (
        <div>
            <div className="manage-spot-heading">
                <h1>Manage Your Spots</h1>
                <button id='manage-spot-create-btn' onClick={() => navigate('/spots/new')}>
                    Create a New Spot
                </button>
            </div>

            <div id='spot-lists-container'>
                { userSpotsArr.map(spot => {
                    return <ManageSpotTile spot={spot} key={spot.id} />
                }) }
            </div>
        </div>
    )
}
