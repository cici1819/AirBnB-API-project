import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams,useHistory } from 'react-router-dom';
import { getAllSpots, getOneSpot } from "../../store/spots";
import "./spots.css"

//get all spots
const Spots = () => {
    const spots = useSelector(state => {
        return state.spots.allSpots;
    });
    const spotsArr = Object.values(spots);
    // console.log('=============', spots)
    const dispatch = useDispatch();
    const history = useHistory();
   const goToSpot = (spotId) => {
       dispatch(getOneSpot(spotId))
       history.push(`/spots/${spotId}`)
   }

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch]);

    if (!spotsArr.length) return null

    return (
        <div className='card'>
            {spotsArr.map(spot => (
                <div key={spot.id}>

                    <div className='spot-card'  onClick={()=>goToSpot(spot.id)} >

                            <img className='spot-image' src={spot.previewImage} alt={spot.description} />
                        <div className='location'>{`${spot.city}, ${spot.state}`}</div>
                        <div className='price'>
                            <span className='number'>{`$${spot.price}`}</span>
                            <span className='night'>night</span>
                        </div>
                    </div>
                    <div className='spot-avgRating'>
                    <i className="fa-sharp fa-solid fa-star"></i>
                        {spot.avgRating && Number(spot.avgRating).toFixed(1)}
                    </div>
                </div>

            ))}

        </div>
    )
}

export default Spots;
