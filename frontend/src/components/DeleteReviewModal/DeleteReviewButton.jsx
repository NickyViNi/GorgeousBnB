import OpenModalButton from '../OpenModalButton'
import DeleteReviewModal from './DeleteReviewModal'
import './DeleteReviewModal.css';

export default function DeleteReviewButton ({reviewId, spotId}) {
    return (
        <div className="delete-review-container">
            <OpenModalButton
                buttonText='Delete'
                buttonId='delete-review-btn'
                modalComponent={<DeleteReviewModal reviewId={reviewId} spotId={spotId} />}
            />
        </div>
    )
}
