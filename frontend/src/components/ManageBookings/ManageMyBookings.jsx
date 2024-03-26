import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUserBookingsThunk } from "../../store/booking";
import "./ManageBooking.css";

export default function ManageMyBookings () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.bookings.userBookings);
    const userBookingsArr = Object.values(bookings);
    userBookingsArr?.sort((a, b) => b.id - a.id );

    // console.log("Current user Bookings Array: ", userBookingsArr)

    useEffect(() => {

        dispatch(getCurrentUserBookingsThunk()).catch(async (res) => {
            const data = await res.json();
            console.error(data)
        });

    }, [dispatch]);

    if(!sessionUser) {
        alert("Try to manage your bookings? Please log in your account!");
        return <Navigate to='/' replace={true} />
    }

    return (
        <div className="manage-bookings-container">
            <h1>Manage My Bookings</h1>
            <div className="bookings-list">
                {userBookingsArr ?
                 <>
                    {userBookingsArr.map(booking =>
                        <div key={booking.id} className="booking-tile">
                            <img className='booking-spot-image' src={booking.Spot.previewImage} alt="Spot Image" onClick={()=> navigate(`/spots/${booking.spotId}`) } title="Click to see spot details" />
                            <div>
                                <div className='booking-spot-name'  onClick={()=> navigate(`/spots/${booking.spotId}`) } title="Click to see spot details">{booking.Spot.name}</div>
                                <div>Start Date: {booking.startDate}</div>
                                <div>End Date: {booking.endDate}</div>
                                <div className='booking-buttons'>
                                    <div onClick={() => (booking)}><i className="fa-solid fa-pen-to-square" title="Update"></i></div>
                                    <div onClick={() => (booking.id)}><i className="fa-solid fa-trash" title="Delete"></i></div>
                                </div>
                            </div>
                        </div>
                    )}
                 </>
                 : "You don't have any booking yet."}
            </div>
        </div>
    )
}
