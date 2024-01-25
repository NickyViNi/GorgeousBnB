import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getSpotByUserThunk } from "../../store/spots";
import ManageSpotTile from "./ManageSpotTile";

export default function ManageSpotsList () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userSpots = useSelector(state => state.spots.userSpots);
    const userSpotsArr = Object.values(userSpots);

    useEffect(() => {
        try{
            dispatch(getSpotByUserThunk());
        } catch {
            return (navigate('/'));
        }
    }, [dispatch, navigate]);

    if (!sessionUser) {
        window.alert("Please log in your account");
        return <Navigate to='/' relative={true} />
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
