import { useNavigate } from 'react-router-dom';

const SpotTitle = ({spot}) => {
    const navigate = useNavigate();

    return (
        <div className='spot-detail' title={spot.name} onClick={() => navigate(`/spots/${spot.id}`)}>
            <div className='spot-image'>
                <img className='image' src={spot.previewImage} />
            </div>
            <div className='spot-infomation'>
                <div className='get-city-state-rating'>
                    <div className='city-state'>
                        {`${spot.city}, ${spot.state}`}
                    </div>
                </div>
                <div className='star-rating'>
                    <i className='fas fa-star'></i>
                    { spot.avgRating === null ? null : parseFloat(spot.avgRating)}
                </div>
                <span className='price-span'>${Math.round(spot.price)}</span> <span className='night-span'>night</span>
            </div>
        </div>
    )
}

export default SpotTitle;
