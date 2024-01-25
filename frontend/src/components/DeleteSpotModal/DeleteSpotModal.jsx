import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteSpotThunk } from "../../store/spots";
import './DeleteSpotModal.css';

export default function DeleteSpotModal ({spotId}) {

    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const submitDelete = () => {
        try {
            dispatch(deleteSpotThunk(spotId)).then(closeModal);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id='delete-spot-modal-container' >
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button id='yes-delete-spot' onClick={submitDelete}>Yes (Delete Spot)</button>
            <button id='no-keep-spot' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}
