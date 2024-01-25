import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formValidation } from './createSpotFormValidation';
import './CreateSpotForm.css';
import { createNewSpotThunk } from '../../store/spots';

// (country, streetAddress, city, state, latitude, longitude, description, spotName, price, preImg, img1, img2, img3, img4)
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
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sessionUser) {
            window.alert("Please log in your account first.");
            navigate('/')
        }

        setErrors({});

        const formValidateErrors = formValidation(country, streetAddress, city, state, latitude, longitude, description, spotName, price, preImg, img1, img2, img3, img4);

        setErrors(formValidateErrors);

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

        const spot = await dispatch(createNewSpotThunk(newSpot, images)).catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
                setErrors({...formValidateErrors, ...data.errors});
            }
            console.log("Errors: ", errors);
        })

        if(spot) {
            navigate(`/spots/${spot.id}`);
        }
    }

    if (!sessionUser) { return null }

    return (
        <div id='create-spot-container'>
            <form id='create-spot-form' onSubmit={handleSubmit}>
                <h1>Create a new Spot</h1>
                <h2>{"Where's your place located?"}</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <div id='country-div'>
                    <div>
                        <label>Country</label>
                        {errors.country && <span className='spot-form-error-message'>*{errors.country}</span>}
                    </div>
                    <input
                        id='country' placeholder='Country' value={country} type='text'
                        onChange={(e) => setCountry(e.value.country) }
                    />
                </div>
                <div id='stree-address-div'>
                    <div>
                        <label>Street Address</label>
                        {errors.streetAddress && <span className='spot-form-error-message'>*{errors.streetAddress}</span>}
                    </div>
                    <input
                        id='stress-address' placeholder='Address' value={streetAddress} type='text'
                        onChange={e => setStreeAddress(e.target.value)}
                    />
                </div>
                <div id='city-state-div'>
                    <div>
                        <label>City</label>
                        {errors.city && <span className='spot-form-error-message'>*{errors.city}</span>}
                        <input
                            id='city' placeholder='City' value={city} type='text'
                            onChange={e => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>State</label>
                        {errors.state && <span className='spot-form-error-message'>*{errors.state}</span>}
                        <input
                            id='state' placeholder='STATE' value={state} type='text'
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div id='latitude-longitude-div'>
                    <div>
                        <label>Latitude </label>
                        {errors.latitude && <span className='spot-form-error-message'>*{errors.latitude}</span>}
                        <input
                            id='latitude' placeholder='Latitude' value={latitude} type='number'
                            onChange={e => setLatitude(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Longitude</label>
                        {errors.longitude && <span className='spot-form-error-message'>*{errors.longitude}</span>}
                        <input
                            id='longitude' placeholder='Longitude' value={longitude} type='number'
                            onChange={e => setLongitude(e.target.value)}
                        />
                    </div>
                </div>
                <div className='create-spot-separator' />

                <h2>Describe your place to guests</h2>
                <p>{"Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood."}</p>
                <textarea
                    id='spot-description' placeholder='Description' value={description}
                    onChange={e => setDescription(e.target.value)} />
                <div>
                    {errors.description && <span className='spot-form-error-message'>*{errors.description}</span>}
                </div>
                <div className='create-spot-separator' />

                <h2>Create a title for your spot</h2>
                <p>{"Catch guests' attention with a spot title that highlights what makes your place special."}</p>
                <input
                    id='new-spot-name' placeholder='Name of your spot' value={spotName} type='text'
                    onChange={e => setSpotName(e.target.value)}
                />
                <div>
                    {errors.spotName && <span className='spot-form-error-message'>*{errors.spotName}</span>}
                </div>
                <div className='create-spot-separator' />

                <h2>Set a base price for your spot</h2>
                <p>{"Competitive pricing can help your listing stand out and rank higher in search results."}</p>
                <div id='price-container'>
                    <span>{"$ "}</span>
                    <input
                    id='spot-price' placeholder='Price per night (USD)' value={price} type='number'
                    onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    {errors.price && <span className='spot-form-error-message'>*{errors.price}</span>}
                </div>
                <div className='create-spot-separator' />

                <h2>Liven up your spot with photos</h2>
                <p>{"Submit a link to at least one photo to publish your spot."}</p>
                <input
                    id='preview-image'
                    placeholder='Preview Image URL'
                    value={preImg}
                    type='text'
                    onChange={e => setPreImg(e.target.value)}>
                </input>
                <div>
                    {errors.preImg && <span className='spot-form-error-message'>*{errors.preImg}</span>}
                </div>
                <input
                    id='other-image-1'
                    placeholder='Image URL'
                    value={img1}
                    type='text'
                    onChange={e => setImg1(e.target.value)}>
                </input>
                <div>
                    {errors.img1 && <span className='spot-form-error-message'>*{errors.img1}</span>}
                </div>

                <input
                    id='other-image-2'
                    placeholder='Image URL'
                    value={img2}
                    type='text'
                    onChange={e => setImg2(e.target.value)}>
                </input>
                <div>
                    {errors.img2 && <span className='spot-form-error-message'>*{errors.img2}</span>}
                </div>

                <input
                    id='other-image-3'
                    placeholder='Image URL'
                    value={img3}
                    type='text'
                    onChange={e => setImg3(e.target.value)}>
                </input>
                <div>
                    {errors.img3 && <span className='spot-form-error-message'>*{errors.img3}</span>}
                </div>

                <input
                    id='other-image-4'
                    placeholder='Image URL'
                    value={img4}
                    type='text'
                    onChange={e => setImg4(e.target.value)}>
                </input>
                <div>
                    {errors.img4 && <span className='spot-form-error-message'>*{errors.img4}</span>}
                </div>

                <div id='spot-images-preview'>
                    {preImg && <img src={`${preImg}`}></img>}
                    {img1 && <img src={`${img1}`}></img>}
                    {img2 && <img src={`${img2}`}></img>}
                    {img3 && <img src={`${img3}`}></img>}
                    {img4 && <img src={`${img4}`}></img>}
                </div>

                <div className='create-spot-separator'></div>

                <button id='create-spot-submit-button'>Create Spot</button>
            </form>
        </div>
    )
}
