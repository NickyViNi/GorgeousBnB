import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteReviewThunk } from "../../store/review";
import ShortLoading from "../Loading/shortLoading";

export default function DeleteReviewModal( { reviewId, spotId } ) {
    const dispatch = useDispatch();
    const {setModalContent, closeModal} = useModal();

    const submitDelete = () => {

        dispatch(deleteReviewThunk(reviewId, spotId));

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
            <p>Are you sure you want to delete this review?</p>
            <button id='yes-delete-spot' onClick={submitDelete}>Yes (Delete Review)</button>
            <button id='no-keep-spot' onClick={closeModal}>No (Keep Review)</button>
        </div>
    )

}
