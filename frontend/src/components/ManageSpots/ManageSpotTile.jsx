import { useNavigate } from "react-router-dom";
import UpdateAndDeleteSpotBtn from "./UpdateAndDeleteSpotBtn";

export default function ManageSpotTile ({spot}) {
    const navigate = useNavigate();

    return (
        <div className="manage-spot-tile-container" title={spot?.name} >
            <div className="spot-image" onClick={() => navigate(`/spots/${spot?.id}`)}>
                <img className="image" src={spot?.previewImage} />
            </div>
            <div className="spot-information" onClick={() => navigate(`/spots/${spot?.id}`)} >
                <div className="city-state-rating">
                    <div className="city-state">
                        {`${spot?.city}, ${spot?.state}`}
                    </div>
                    <div className="star-rating">
                        <i className="fas fa-star single-star"></i>
                        {spot?.avgRating}
                    </div>
                </div>
                <span className="price-span">$ {spot?.price}</span>
                <span className="night-span">night</span>
            </div>
            <UpdateAndDeleteSpotBtn spotId={spot?.id}/>
        </div>
    )
}
