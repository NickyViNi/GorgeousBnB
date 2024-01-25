import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSpotByIdThunk } from "../../store/spots";

export default function UpdateAndDeleteSpotBtn({spotId}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updatedSpotBtn = () => {
        dispatch(getSpotByIdThunk(spotId));
        navigate(`/spots/${spotId}/edit`);
    }
}
