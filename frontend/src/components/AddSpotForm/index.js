import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";

const AddSpotForm = () => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    if (!sessionUser) {
        alert("Please log in or Sign Up");
        history.push("/");
    }
    useEffect(() => {
        // if (!address && !city && !state && !country && !name && !description && !price) {
        //     setValidationErrors([]);
        //     return;
        // } else {
        const errors = [];

        if (name.length === 0) {
            errors.push("Name is required");
        } else if (name.length > 49) {
            errors.push("Name must be less than 50 characters");
        }

        if (description.length === 0) {
            errors.push("Description is required");
        } else if (description.length > 255) {
            errors.push("Description must be less than 256 characters");
        }

        if (address.length === 0) {
            errors.push("Address is required");
        } else if (address.length > 255) {
            errors.push("Address must be less than 256 characters");
        }
        if (country.length === 0) {
            errors.push("Country is required");
        } else if (country.length > 255) {
            errors.push("Country must be less than 256 characters");
        }

        if (state.length === 0) {
            errors.push("State is required");
        } else if (state.length > 255) {
            errors.push("State must be less than 256 characters");
        }

        if (city.length === 0) {
            errors.push("City is required");
        } else if (city.length > 255) {
            errors.push("City must be less than 256 characters");
        }
        if (!lat) {
            errors.push("Latitude is required")
        } else if (lat < -90 || lat > 90) {
            errors.push("Latitude must be between -90 and 90");
        }
        if (!lng) {
            errors.push("Longitude is required")
        } else if (lng < -180 || lng > 180) {
            errors.push("Longitude must be between -180 and 180");
        }

        if (!price) {
            errors.push("Price is required");
        } else if (price < 0) {
            errors.push("Price must be greater than 0");
        }

        setValidationErrors(errors);

        // }

    }, [name,
        description,
        address,
        price,
        city,
        state,
        country,
        lat,
        lng,
    ]);

    const reset = () => {
        setName("");
        setAddress("");
        setCity("");
        setCountry("");
        setState("");
        setDescription("");
        setLat("");
        setLng("");
        setPrice("");
        setValidationErrors([]);
        setHasSubmitted(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Validation Erroes Cannot Submit`);
        const newSpot = {
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng,
            price
        }




        const addSpot = dispatch(spotsActions.addSpot(newSpot)).then((res) => {
            const data = res.json();
            if (data && data.errors) setValidationErrors(data.errors);
        })
        if (addSpot) {
            // const SpotImages = ({
            //     url: image,
            //     preview:true

            // })
            setValidationErrors([]);
            history.push(`/spots/${addSpot.id}`);

            // if (img) {
            //     const newImg = { url, preview: true }
            //     // const createdImg = await dispatch(spotsActions.addSpotImg(addSpot.id, newImg));
            //     if (createdImg) setValidationErrors([]);
            //     const data = await res.json();
            //     if (data && data.errors) setValidationErrors(data.errors);
            // }

        }

        reset();
    };

    return (
        <form onSubmit={handleSubmit} className="add-spot-form">
            <div className='errors-div'>
                {validationErrors.length > 0 && (
                    <ul className="errors">
                        {validationErrors.map((error) => <li className="error">{error}</li>)}
                    </ul>
                )}

            </div>
            <div className='spot-name'>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='description'>
                <label>
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </label>
            </div>
            <div className='price'>
                <label>
                    Price
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='address'>
                <label>
                    Address
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required

                    />
                </label>
            </div>
            <div className='city'>
                <label>
                    City
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='state'>
                <label>
                    State
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div>
                <label>
                    Country
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className='lat'>
                <label>
                    Latitude
                    <input
                        type="text"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className='lon'>
                <label>
                    Longitude
                    <input
                        type="text"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
            </div>

            {/* <div className='preview-img'>
                <label>
                    Preview Image
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required

                    />
                </label>
            </div> */}
            <div className='addSpot-button'>
                <button type="submit"
                    disabled={hasSubmitted && validationErrors.length > 0}
                >Submit</button>
            </div>
        </form>
    );
}


export default AddSpotForm
