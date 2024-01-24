import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formValidation } from './createSpotFormValidation';
import './CreateSpotForm.css';

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
    const [img1, setimg1] = useState('');
    const [img2, setimg2] = useState('');
    const [img3, setimg3] = useState('');
    const [img4, setimg4] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    return (
        <h1>Hello...</h1>
    )

}
