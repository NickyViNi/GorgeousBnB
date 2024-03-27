import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getBookingByOwnerThunk } from "../../store/booking";

export default function ManageSpotBookings () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.bookings.spotBookings);
    const spotBookingsArr = Object.values(bookings);
    spotBookingsArr?.sort((a, b) => b.id - a.id );

    console.log("spot bookings Array: ", spotBookingsArr)

    useEffect(() => {

        dispatch(getBookingByOwnerThunk());

    }, [dispatch])

    if(!sessionUser) {
        alert("Try to manage all your spot bookings? Please log in your account!");
        return <Navigate to='/' replace={true} />
    }

    return (
        <div>
            <h1>
                manage spot booking
            </h1>
        </div>
    )
}
