import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as spotsActions from "../../store/spots";
import './UpdateSpotForm.css'

const UpdateSpotForm = ({ spot, setShowModal }) => {

    // const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    // const { spotId } = useParams();

    // const spot = useSelector(state => state.spots.spot)

    const [address, setAddress] = useState(spot?.address);
    const [city, setCity] = useState(spot?.city);
    const [state, setState] = useState(spot?.state);
    const [country, setCountry] = useState(spot?.country);
    const [lat, setLat] = useState(spot?.lat);
    const [lng, setLng] = useState(spot?.lng);
    const [name, setName] = useState(spot?.name);
    const [description, setDescription] = useState(spot?.description);
    const [price, setPrice] = useState(spot?.price);

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    console.log("updatedSpot, spot ~~~~~~~~~~~@@@@", spot)

    // useEffect(() => {
    //     dispatch(spotsActions.getOneSpot(spotId))

    // }, [dispatch, spotId])


    useEffect(() => {

        const errors = [];

        if (!name.length) {
            errors.push("Name is required");
        }
        else if (name.length > 30) {
            errors.push("Name must be less than 30 characters");
        }
        if (!description.length) {
            errors.push("Description is required");
        }

        else if (description.length > 500) {
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
        } else if (lat < -90 || lat > 90) {
            errors.push("Latitude must be between -90 and 90");
        }
        if (!lng || isNaN(lng)) {
            errors.push("Longitude is requiredand must be number between -180 and 180")
        } else if (lng < -180 || lng > 180) {
            errors.push("Longitude must be between -180 and 180");
        }

        if (!price) {
            errors.push("Price is required");
        } else if (price < 0 || isNaN(price)) {
            errors.push("Price must be a number and greater than 0");
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
            price
        }
        if (!validationErrors.length) {
            console.log("updatedSpot spot.id ??????????///", spot.id)
            const updatedSpot = await dispatch(spotsActions.editSpot(+spot.id, newSpot,))

            if (updatedSpot) {
                setValidationErrors([]);
                setShowModal(false)
                history.push(`/spots/${updatedSpot.id}`);
                // history.push("/");

            }


        };
    }


    return (
        <>
            <div className='update-spot-wrap2'>
                <form onSubmit={handleSubmit} className="updateSpot-form">
                    <div className='update-spot-title'>
                        <h3>Edit Spot</h3>
                    </div>
                    <div className='errorslist-div'>
                        {hasSubmitted && validationErrors.length > 0 && (
                            // <div className='error-list'>
                            <ul className="errors">
                                {validationErrors.map((error) => <li className="error">{error}</li>)}
                            </ul>
                            //  {/* </div> */}

                        )}
                    </div>
                    <div className='spot-input-info2'>

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

                                <input
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></input>
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

                        <div>
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
                                    value={lng}
                                    onChange={(e) => setLng(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                    </div>




                    <div className='updateSpot-form-button'>
                        <button type="submit"
                            disabled={hasSubmitted && validationErrors.length > 0}
                        >
                            Update your Spot</button>
                    </div>
                </form >
            </div >
        </>
    );
}


export default UpdateSpotForm
