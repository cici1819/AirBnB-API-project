import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as spotsActions from "../../store/spots";

const AddSpotForm = ({ setShowModal }) => {

    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
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


    // if (!sessionUser) {
    //     alert("Please log in or Sign Up");
    //     history.push("/");
    // }
    useEffect(() => {
        //     if (!address && !city && !state && !country && !name && !description && !price &&!url &&!lat &&!lng ) {
        //         setValidationErrors([]);
        //         return;
        //     }

        const errors = [];
        if (!name.length) {
            errors.push("Name is required");
        } else if (name.length > 30) {
            errors.push("Name must be less than 30 characters");
        }

        if (!description.length) {
            errors.push("Description is required");
        } else if (description.length > 500) {
            errors.push("Description must be less than 500 characters");
        }

        if (!address.length) {
            errors.push("Address is required");
        } else if (address.length > 100) {
            errors.push("Address must be less than 100 characters");
        }
        if (!country.length) {
            errors.push("Country is required");
        } else if (country.length > 50) {
            errors.push("Country must be less than 50 characters");
        }

        if (!state.length) {
            errors.push("State is required");
        } else if (state.length > 50) {
            errors.push("State must be less than 50 characters");
        }

        if (!city.length) {
            errors.push("City is required");
        } else if (city.length > 50) {
            errors.push("City must be less than 50 characters");
        }
        if (!lat || isNaN(lat)) {
            errors.push("Latitude is required and must be number between -90 and 90")
        }
        else if (lat < -90 || lat > 90) {
            errors.push("Latitude must be between -90 and 90");
        }
        if (!lng || isNaN(lng)) {
            errors.push("Longitude is required and must be number between -180 and 180")
        }
        else if (lng < -180 || lng > 180) {
            errors.push("Longitude must be between -180 and 180");
        }

        if (!price) {
            errors.push("Price is required");
        } else if (price < 0 || isNaN(price)) {
            errors.push("Price must be a number and greater than 0");
        }
        if (!url.includes('.com') && !url.includes('.jpg') && !url.includes(".png") && !url.includes(".jpeg")) {
            errors.push("Please provide  a vaild url")
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
        url

    ]);

    // const reset = () => {
    //     setName("");
    //     setAddress("");
    //     setCity("");
    //     setCountry("");
    //     setState("");
    //     setDescription("");
    //     setLat("");
    //     setLng("");
    //     setPrice("");
    //     setUrl("");
    //     setValidationErrors([]);
    //     setHasSubmitted(false);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) return alert(`Validation Errors Cannot Submit`);
        const newSpot = {
            name,
            description,
            address,
            city,
            state,
            country,
            lat,
            lng,
            price,
            url
        }




        const addSpot = await dispatch(spotsActions.addSpot(newSpot))
        // .catch(
        //     async (res) => {
        //         const data = res.json();
        //         if (data && data.errors) setValidationErrors(data.errors);
        //         console.log("data.errors1111111111111" + data.errors)
        //         // if (data && data.statusCode === 500) setValidationErrors(["Validation Erroes Cannot Submit"])
        //     })
        // console.log("***************", addSpot)
        if (addSpot) {

            setValidationErrors([]);

            setShowModal(false)

            history.push('/');

        }

        //    reset ()
    };

    return (
        <form onSubmit={handleSubmit} className="add-spot-form">
            <div className='errors-div'>
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul className="errors">
                        {validationErrors.map((error) => <li key={error} className="error">{error}</li>)}
                    </ul>

                )}
            </div>
            <div className='spot-name'>
                <label>
                    <input
                        placeholder='Name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='description'>
                <label>

                    <textarea
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </label>
            </div>
            <div className='price'>
                <label>

                    <input
                        placeholder='Price'
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='address'>
                <label>

                    <input
                        placeholder='Address'
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required

                    />
                </label>
            </div>
            <div className='city'>
                <label>

                    <input
                        placeholder='City'
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div className='state'>
                <label>

                    <input
                        placeholder='State'
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className='country'>
                <label>

                    <input
                        placeholder='Country'
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className='lat'>
                <label>

                    <input
                        placeholder='Latitude'
                        type="text"
                        // min="-90"
                        // max="90"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className='lon'>
                <label>

                    <input
                        placeholder='Longitude'
                        type="text"
                        // min="-120"
                        // max="120"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        required
                    />
                </label>
            </div>

            <div className='preview-img'>
                <label>

                    <input
                        placeholder='Preview Image Url'
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required

                    />
                </label>
            </div>
            <div className='addSpot-button'>
                <button type="submit"
                    disabled={hasSubmitted && validationErrors.length > 0}
                >Submit</button>
            </div>
        </form>
    );
}


export default AddSpotForm