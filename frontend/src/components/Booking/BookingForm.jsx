import { useState } from "react";
import { daysBetween } from "../../helpers/daysBetween";
import { getToday } from "../../helpers/getToday";
import { getTomorrow } from "../../helpers/getTomorrow";
import "./BookingForm.css";

function BookingForm ({spot, user}) {

    const [ startDate, setStartDate ] = useState(getToday());
    const [ endDate, setEndDate ] = useState(getTomorrow());
    // console.log("start day: ", startDate, "end date: ", endDate)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            spotId: spot.id,
            userId: user.id,
            startDate,
            endDate
        }
    }

    return (
        <div className="booking-form-container">
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
                <button
                type="submit"
                className='reserve-button booking-button'
                >Reserve</button>
            </form>
        </div>
    )
}

export default BookingForm;
