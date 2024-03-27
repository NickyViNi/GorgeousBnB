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

    console.log("spot bookings Array: ", spotBookingsArr)

    useEffect(() => {

        dispatch(getBookingByOwnerThunk());

    }, [dispatch])

    const deleteBooking = async (bookingId) => {
        await dispatch(deleteBookingThunk(bookingId));
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
            <h1>Manage My Spots' Bookings</h1>
            <div className="bookings-list">
                {spotBookingsArr ?
                 <>
                    {spotBookingsArr.map(booking =>
                        <div key={booking.id} className="booking-tile">
                            <img className='booking-spot-image' src={booking.Spot.previewImage} alt="Spot Image" onClick={()=> navigate(`/spots/${booking.spotId}`) } title="Click to see spot details" />
                            <div>
                                <div className='manage-booking-spot-name'  onClick={()=> navigate(`/spots/${booking.spotId}`) } title="Click to see spot details">{booking.Spot.name}</div>
                                <div>Start Date: {booking.startDate}</div>
                                <div>End Date: {booking.endDate}</div>
                                <div className='booking-buttons'>
                                    <div onClick={() => showBookingMoal(booking)}><i className="fa-solid fa-pen-to-square" title="Update"></i></div>
                                    <div onClick={() => showConfirmBookingModal(booking.id, booking.Spot.name)}><i className="fa-solid fa-trash" title="Delete"></i></div>
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
