import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { useState } from "react";
import { createReviewThunk } from "../../store/review";
import './CreateReviewModal.css';
import ShortLoading from "../Loading/shortLoading";

export default function CreateReviewModal () {

    const dispatch = useDispatch();
    const {setModalContent, closeModal } = useModal();
    const currentSpot = useSelector(state => state.spots.currentSpot);

    const [reviewText, setReviewText] = useState('');

    const [hoverStars, setHoverStars] = useState(0); // State for hover state
    const [selectedStars, setSelectedStars] = useState(0); // State for selected state
    const [errors, setErrors] = useState({});

    // useEffect (() => {
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(createReviewThunk({review: reviewText, stars: selectedStars}, currentSpot.id));
        if (data.errors) {
            return setErrors(data.errors);
        }

        setModalContent(
            <div className="notification-modal">
                <h1>Notification</h1>
                <h2>Successfully Posted</h2>
                <div><ShortLoading /></div>
            </div>
        )

        setTimeout(() => {
          closeModal()
        }, 4000);

    }

    const renderStar = (index) => {
      return (
        <div
        className={ (index <=  hoverStars) ? 'filled' : 'empty' }
        onMouseEnter={() => setHoverStars(index)}
        onMouseLeave={() => setHoverStars(selectedStars)}
        onClick={() => setSelectedStars(index)}
        key={index}
        >
          <i className="fa fa-star emptyStar"></i>
        </div>
      )
    }

    return (
        <div id='create-review-form-container'>
            <h1 id='create-review-h1'>How was your stay?</h1>
            {errors.length > 0 && <span id='create-review-errors'>{errors}</span> }
            <form id='create-review-form' onSubmit={handleSubmit}>
                <textarea
                    id='create-review-textarea'
                    placeholder="Leave your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />

                <div className='review-rating-input' >
                    {Array.from({length: 5}, (_k, i) => renderStar(i+1))}
                    {/* {Array.from({length: 5}, (_k, i) => <i className="fa fa-star empty"></i> )} */}
                    <span id='review-form-stars-text'>Stars</span>
                </div>

                <button id='create-review-form-button' disabled={reviewText.length < 10 || selectedStars < 1} >Submit Your Review</button>
            </form>
        </div>
    )
}
