import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUserReviewsThunk } from "../../store/review";
import { Navigate, useNavigate } from "react-router-dom";

export default function ManageReviews () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useSelector(state => state.session.user);
    const reviews = useSelector(state => state.reviews.userReviews);
    const userReviewsArr = Object.values(reviews);

    console.log("User Reviews Array: ", userReviewsArr)

    useEffect( () => {

        dispatch(getCurrentUserReviewsThunk()).catch(async (res) => {
            const data = await res.json();
            console.error(data)
        })

    }, [dispatch])

    if(!sessionUser) {
        alert("Try to manage your reviews? Please log in your account!");
        return <Navigate to='/' replace={true} />
    }

    return (
        <div className="current-user-reviews-container">
            <h1>Manage Reviews</h1>
            <div>
                hello
            </div>
        </div>
    )
}
