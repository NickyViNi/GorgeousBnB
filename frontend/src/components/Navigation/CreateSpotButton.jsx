import { Link } from "react-router-dom";

export default function CreateSpotButton ({user}) {
    if (!user) {
        return <></>;
    }

    return (
        <Link to='/spots/new'>
            <button id='create-spot-button'>Create a New Spot</button>
        </Link>
    )
}
