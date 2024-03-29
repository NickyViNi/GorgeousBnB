import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteBookingThunk, getBookingByOwnerThunk } from "../../store/booking";
import { useModal } from "../../context/Modal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ShortLoading from "../Loading/shortLoading";
import BookingForm from "../Booking/BookingForm";

export default function ManageSpotBookings () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent, closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.bookings.spotBookings);
    const spotBookingsArr = Object.values(bookings);
    spotBookingsArr?.sort((a, b) => b.id - a.id );

    useEffect(() => {

        dispatch(getBookingByOwnerThunk());

    }, [dispatch])

    const deleteBooking = async (bookingId) => {
        const data = await dispatch(deleteBookingThunk(bookingId));

        if (data.errors) {
            setModalContent(
                <div className="notification-modal">
                    <h1 style={{color:"brown"}}>Notification</h1>
                    <h2>Sorry, You can&#39;t delete past booking or already started booking.</h2>
                    <div><ShortLoading /></div>
                </div>
            )
        }
    }

    const showConfirmBookingModal = (bookingId, spotName) => {
        setModalContent(
            <ConfirmModal
                header={"Confirm Delete Booking"}
                text={"Are you sure you want to delete this booking?"}
                deleteCb={() => {
                    deleteBooking(bookingId);
                    setModalContent(
                        <div className="notification-modal">
                            <h1>Notification</h1>
                            <h2>Successfully Deleted the Booking at the {spotName} </h2>
                            <div><ShortLoading /></div>
                        </div>
                    );

                    setTimeout(() => {
                        closeModal();
                    }, 4000);
                }}
                cancelDeleteCb={closeModal}
            />
        )
    }

    const showBookingMoal = (booking) => {
        setModalContent(
            <BookingForm
                spot={booking.Spot}
                booking={booking}
                bookingType="spot-bookings"
            />
        )
    }

    if(!sessionUser) {
        alert("Try to manage all your spot bookings? Please log in your account!");
        return <Navigate to='/' replace={true} />
    }

    return (
        <div className="manage-bookings-container">
            <h1>Manage My Spots&apos; Bookings</h1>
            <div className="bookings-list">
                {spotBookingsArr.length > 0 ?
                 <>
                    {spotBookingsArr.map(booking =>
                        <div key={booking.id} className="booking-tile">
                            <div>
                            <img className='booking-spot-image' src={booking.Spot.previewImage} alt="Spot Image" onClick={()=> navigate(`/spots/${booking.spotId}`) } title="Click to see spot details" />
                            <div className='booking-buttons booking-buttons-spot'>
                                <div onClick={() => showBookingMoal(booking)}><i className="fa-solid fa-pen-to-square" title="Update"></i></div>
                                <div onClick={() => showConfirmBookingModal(booking.id, booking.Spot.name)}><i className="fa-solid fa-trash" title="Delete"></i></div>
                            </div>
                            </div>
                            <div>
                                <div className='manage-booking-spot-name'  onClick={()=> navigate(`/spots/${booking.spotId}`) } title="Click to see spot details">{booking.Spot.name}</div>
                                <div className="customer-name customer-info">Customer Name: {booking.User.firstName} {booking.User.lastName}</div>
                                <div className="customer-email customer-info">Email: {booking.User.email}</div>
                                <div className="start-date customer-info">Check-In: {booking.startDate}</div>
                                <div className="end-date customer-info">Checkout: {booking.endDate}</div>
                            </div>
                        </div>
                    )}
                 </>
                 : "Your spots don't have any booking yet."}
            </div>
        </div>
    )
}
