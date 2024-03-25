import { useState } from "react";
import { daysBetween } from "../../helpers/daysBetween";
import { getToday } from "../../helpers/getToday";
import { getTomorrow } from "../../helpers/getTomorrow";

function BookingForm ({spot}) {

    const [ startDate, setStartDate ] = useState(getToday());
    const [ endDate, setEndDate ] = useState(getTomorrow());
    // console.log("start day: ", startDate, "end date: ", endDate)
    const handleSubmit = () => {
        return 2
    }

    return (
        <div className="booking-form-container">
            <div>${ spot.price } night</div>
            <form onSubmit={handleSubmit} className="booking-form-submit">
                <label>CHECK-IN</label>
                <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
                />
                <label>CHECKOUT</label>
                <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required
                />
                <div>
                    <div>$ {spot.price} x {daysBetween(startDate, endDate)} </div>
                    <div>$ {spot.price * daysBetween(startDate, endDate)}</div>
                    <div>Cleaning Fee</div>
                    <div>$100</div>
                    <div>Taxes</div>
                    <div>$ {(spot.price * daysBetween(startDate, endDate) + 100) * 0.1 }</div>
                </div>
                <div className="seperator"></div>
                <div>
                    <div>Toal</div>
                    <div>$ {(spot.price * daysBetween(startDate, endDate) + 100) * 1.1 }</div>
                </div>
                <button
                type="submit"
                className='reserve-button'
                >Reserve</button>
            </form>
        </div>
    )
}

export default BookingForm;
