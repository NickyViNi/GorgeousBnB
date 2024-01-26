import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteReviewThunk } from "../../store/review";

export default function DeleteReviewModal( { reviewId, spotId } ) {
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const submitDelete = () => {
        try {
            dispatch(deleteReviewThunk(reviewId, spotId)).then(closeModal);
        } catch (error) {
            console.error(error);
        }
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
