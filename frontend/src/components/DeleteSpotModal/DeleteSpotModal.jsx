import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteSpotThunk } from "../../store/spots";
import './DeleteSpotModal.css';
import ShortLoading from "../Loading/shortLoading";

export default function DeleteSpotModal ({spotId}) {

    const dispatch = useDispatch();
    const {setModalContent, closeModal} = useModal();

    const submitDelete = async () => {

        const data = await dispatch(deleteSpotThunk(spotId));

        if (data.errors) return data.errors;

        setModalContent(
            <div className="notification-modal">
                <h1>Notification</h1>
                <h2>Successfully Deleted</h2>
                <div><ShortLoading /></div>
            </div>
        )

        setTimeout(() => {
          closeModal()
        }, 4000);

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
