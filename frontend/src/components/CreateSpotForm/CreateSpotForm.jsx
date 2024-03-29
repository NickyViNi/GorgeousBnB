import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { formValidation } from './createSpotFormValidation';
import './CreateSpotForm.css';
import { createNewSpotThunk } from '../../store/spots';
import ShortLoading from '../Loading/shortLoading';

export default function CreateSpotForm() {

    const [country, setCountry] = useState('');
    const [streetAddress, setStreeAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [description, setDescription] = useState('');
    const [spotName, setSpotName] = useState('');
    const [price, setPrice] = useState('');
    const [preImg, setPreImg] = useState('');
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [frontErrors, setFrontErrors] = useState({});
    const [backErrors, setBackErrors] = useState({});
    const [imageIsUploading, setImageIsUploading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFrontErrors({});
        setBackErrors({});

        const formValidateErrors = formValidation(country, streetAddress, city, state, latitude, longitude, description, spotName, price, preImg, img1, img2, img3, img4);

        setFrontErrors(formValidateErrors);

        // console.log("image size: ", [preImg, img1, img2, img3, img4])

        if (Object.values(formValidateErrors).length) { return }

        const newSpot = {
            ownerId: sessionUser.id,
            address: streetAddress,
            city, state, country,
            lat: latitude,
            lng: longitude,
            name: spotName,
            description, price
        }

        const images = [preImg, img1, img2, img3, img4];

        if (preImg || img1 || img2 || img3 || img4) {
            setImageIsUploading(true);
        }

        const spot = await dispatch(createNewSpotThunk(newSpot, images)).catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
                setBackErrors({...data.errors});
            }
        })

        if (Object.values(backErrors).length) { return }

        if(spot) {
            navigate(`/spots/${spot.id}`);
        }
    }

    if (!sessionUser) {
        window.alert("Try to create a new spot? Please log in your account!");
        return <Navigate to='/' replace={true} />
    }

    return (
        <div id='create-spot-container'>
            <h1 id='spot-form-h1'>Create a New Spot</h1>
            <form id='create-spot-form' onSubmit={handleSubmit}>

                <h2 id='spot-form-h2'>{"Where's your place located?"}</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div id='country-div'>
                    <div>
                        <label>Country</label>
                        {frontErrors.country && <span className='spot-form-error-message'>*{frontErrors.country}</span>}
                    </div>
                    <input className='create-spot-form-input'
                        id='country' placeholder='Country' value={country} type='text'
                        onChange={(e) => setCountry(e.target.value) }
                    />
                </div>
                <div id='stree-address-div'>
                    <div>
                        <label>Street Address</label>
                        {frontErrors.streetAddress && <span className='spot-form-error-message'>*{frontErrors.streetAddress}</span>}
                    </div>
                    <input className='create-spot-form-input'
                        id='stress-address' placeholder='Street Address' value={streetAddress} type='text'
                        onChange={e => setStreeAddress(e.target.value)}
                    />
                </div>
                <div id='city-state-div'>
                    <div>
                        <label>City</label>
                        {frontErrors.city && <span className='spot-form-error-message'>*{frontErrors.city}</span>}
                        <input className='create-spot-form-input'
                            id='city' placeholder='City' value={city} type='text'
                            onChange={e => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>State</label>
                        {frontErrors.state && <span className='spot-form-error-message'>*{frontErrors.state}</span>}
                        <input className='create-spot-form-input'
                            id='state' placeholder='STATE' value={state} type='text'
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div id='latitude-longitude-div'>
                    <div>
                        <label>Latitude </label>
                        {frontErrors.latitude && <span className='spot-form-error-message'>*{frontErrors.latitude}</span>}
                        <input className='create-spot-form-input'
                            id='latitude' placeholder='Latitude' value={latitude} type='number'
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Longitude</label>
                        {frontErrors.longitude && <span className='spot-form-error-message'>*{frontErrors.longitude}</span>}
                        <input className='create-spot-form-input'
                            id='longitude' placeholder='Longitude' value={longitude} type='number'
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </div>
                </div>
                <div className='create-spot-separator' />

                <h2>Describe your place to guests</h2>
                <p>{"Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood."}</p>
                <textarea
                    id='spot-description' placeholder='Please write at least 30 characters' value={description}
                    onChange={e => setDescription(e.target.value)} />
                <div>
                    {frontErrors.description && <span className='spot-form-error-message'>*{frontErrors.description}</span>}
                </div>
                <div className='create-spot-separator' />

                <h2>Create a title for your spot</h2>
                <p>{"Catch guests' attention with a spot title that highlights what makes your place special."}</p>
                <input className='create-spot-form-input'
                    id='new-spot-name' placeholder='Name of your spot' value={spotName} type='text'
                    onChange={e => setSpotName(e.target.value)}
                />
                <div>
                    {frontErrors.spotName && <span className='spot-form-error-message'>*{frontErrors.spotName}</span>}
                </div>
                <div className='create-spot-separator' />

                <h2>Set a base price for your spot</h2>
                <p>{"Competitive pricing can help your listing stand out and rank higher in search results."}</p>
                <div id='price-container'>
                    <span>{"$ "}</span>
                    <input
                        className='create-spot-form-input'
                        id='spot-price'
                        placeholder='Price per night (USD)'
                        type='number'
                        min={0.0}
                        step={0.01}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    {frontErrors.price && <span className='spot-form-error-message'>*{frontErrors.price}</span>}
                </div>
                <div className='create-spot-separator' />

                <h2>Liven up your spot with photos</h2>
                <p>{"Submit a link to at least one photo to publish your spot."}</p>
                <input
                    className='create-spot-form-input'
                    id='preview-image'
                    type='file'
                    accept='image/*'
                    onChange={e => setPreImg(e.target.files[0])}>
                </input>
                <div>
                    {frontErrors.preImg && <span className='spot-form-error-message'>*{frontErrors.preImg}</span>}
                    {frontErrors.preImgSize && <span className='spot-form-error-message'>*{frontErrors.preImgSize}</span>}
                </div>
                <input className='create-spot-form-input'
                    id='other-image-1'
                    type='file'
                    accept='image/*'
                    onChange={e => setImg1(e.target.files[0])}>
                </input>
                <div>
                    {frontErrors.img1 && <span className='spot-form-error-message'>*{frontErrors.img1}</span>}
                    {frontErrors.img1Size && <span className='spot-form-error-message'>*{frontErrors.img1Size}</span>}
                </div>

                <input className='create-spot-form-input'
                    id='other-image-2'
                    type='file'
                    accept='image/*'
                    onChange={e => setImg2(e.target.files[0])}>
                </input>
                <div>
                    {frontErrors.img2 && <span className='spot-form-error-message'>*{frontErrors.img2}</span>}
                    {frontErrors.img2Size && <span className='spot-form-error-message'>*{frontErrors.img2Size}</span>}
                </div>

                <input className='create-spot-form-input'
                    id='other-image-3'
                    type='file'
                    accept='image/*'
                    onChange={e => setImg3(e.target.files[0])}>
                </input>
                <div>
                    {frontErrors.img3 && <span className='spot-form-error-message'>*{frontErrors.img3}</span>}
                    {frontErrors.img3Size && <span className='spot-form-error-message'>*{frontErrors.img3Size}</span>}
                </div>

                <input className='create-spot-form-input'
                    id='other-image-4'
                    type='file'
                    accept='image/*'
                    onChange={e => setImg4(e.target.files[0])}>
                </input>
                <div>
                    {frontErrors.img4 && <span className='spot-form-error-message'>*{frontErrors.img4}</span>}
                    {frontErrors.img4Size && <span className='spot-form-error-message'>*{frontErrors.img4Size}</span>}
                </div>

                <div id='spot-images-preview'>
                    {/* {preImg && <img src={`${preImg}`}></img>} */}
                    {preImg && <img src={window.URL.createObjectURL(preImg)}></img> }
                    {img1 && <img src={window.URL.createObjectURL(img1)}></img>}
                    {img2 && <img src={window.URL.createObjectURL(img2)}></img>}
                    {img3 && <img src={window.URL.createObjectURL(img3)}></img>}
                    {img4 && <img src={window.URL.createObjectURL(img4)}></img>}
                </div>
                {imageIsUploading && <ShortLoading />}
                <div className='create-spot-separator'></div>
                {Object.values(backErrors).length > 0 && <span className='spot-form-error-message'>*{Object.values(backErrors)}</span>}
                <button id='create-spot-submit-button'>Create Spot</button>
            </form>
        </div>
    )
}
