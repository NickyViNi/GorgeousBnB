import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteBookingThunk, getCurrentUserBookingsThunk } from "../../store/booking";
import "./ManageBooking.css";
import { useModal } from "../../context/Modal";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import ShortLoading from "../Loading/shortLoading";
import BookingForm from "../Booking/BookingForm";

export default function ManageMyBookings () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent, closeModal } = useModal();
    const sessionUser = useSelector(state => state.session.user);
    const bookings = useSelector(state => state.bookings.userBookings);
    const userBookingsArr = Object.values(bookings);
    userBookingsArr?.sort((a, b) => b.id - a.id );

    // console.log("Current user Bookings Array: ", userBookingsArr)

    useEffect(() => {

        dispatch(getCurrentUserBookingsThunk());

    }, [dispatch]);

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
            />
        )
    }

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
