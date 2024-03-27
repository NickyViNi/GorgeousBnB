import { useState } from "react";
import { daysBetween } from "../../helpers/daysBetween";
import { getToday } from "../../helpers/getToday";
import { getTomorrow } from "../../helpers/getTomorrow";
import { useModal } from "../../context/Modal";
import { createBookingThunk, updateBookingThunk } from "../../store/booking";
import { useDispatch } from "react-redux";
import ShortLoading from "../Loading/shortLoading";
import "./BookingForm.css";

function BookingForm ({spot, booking, bookingType}) {

    const [ startDate, setStartDate ] = useState(booking?.startDate || getToday());
    const [ endDate, setEndDate ] = useState(booking?.endDate || getTomorrow());
    const [ errors, setErrors ] = useState();
    const dispatch = useDispatch();
    const { closeModal, setModalContent } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data;
        if (booking) {
            data = await dispatch(updateBookingThunk(booking.id, {startDate, endDate}, bookingType));
        } else {
            data = await dispatch(createBookingThunk({startDate, endDate}, spot.id));
        }

        console.log("dataaaaaaa: ", data)
        if (data?.message) {
            console.log("errrrrrrrrr: ", data)
            return setErrors(data);
        }

        setModalContent(
            <div className="notification-modal">
                <h1>Notification</h1>
                {booking? <h2>Successfully Updated Booking at the {spot.name} </h2> : <h2>Successfully Reserved at the {spot.name} </h2>}
                <div><ShortLoading /></div>
            </div>
        )

        setTimeout(() => {
            closeModal();
        }, 4000);
    }

    return (
        <div className="booking-form-container">
            <div onClick={() => closeModal()} title="Close" className="close-modal">
                <i className="fa-solid fa-circle-xmark"></i>
            </div>
            <div className="booking-spot-name">{spot.name}</div>
            <div className="booking-price">${ spot.price.toFixed(2) } night</div>
            <form onSubmit={handleSubmit} className="booking-form-submit">
                <div className="check-in-out">
                    <div className="booking-check">
                        <label>CHECK-IN</label>
                        <input
                        type="date"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                        min={getToday()}
                        required
                        />
                    </div>
                    <div className="vertical-separator"></div>
                    <div className="booking-check">
                        <label>CHECKOUT</label>
                        <input
                        type="date"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                        min={getTomorrow()}
                        required
                        />
                    </div>
                </div>
                <div className="calculate-price-container">
                    <div className="calculate-price">
                        <div>${spot.price} x {daysBetween(startDate, endDate)} nights</div>
                        <div>${(spot.price * daysBetween(startDate, endDate)).toFixed(2)}</div>
                    </div>
                    <div className="calculate-price">
                        <div>Cleaning Fee</div>
                        <div>$99.99</div>
                    </div>
                    <div className="calculate-price">
                        <div>Taxes</div>
                        <div>$ {((spot.price * daysBetween(startDate, endDate) + 100) * 0.1).toFixed(2) }</div>
                    </div>
                </div>
                <div className="booking-separator"></div>
                <div className="calculate-price total-price">
                    <div>Total</div>
                    <div>$ {((spot.price * daysBetween(startDate, endDate) + 100) * 1.1).toFixed(2) }</div>
                </div>
                {errors?.message && <div className="modal-errors">{errors?.message}</div>}
                {errors?.errors?.startDate && <div className="modal-errors">{errors?.errors?.startDate}</div>}
                {errors?.errors?.endDate && <div className="modal-errors">{errors?.errors?.endDate}</div>}
                <button
                type="submit"
                className='reserve-button booking-button'
                >
                    {booking? "Update" : "Reserve"}
                </button>
            </form>
        </div>
    )
}

export default BookingForm;
