import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import * as spotsActions from "../../store/spots"
import DeleteSpot from "../DeleteSpot"
import UpdateSpotFormModal from '../UpdateSpotFormModal';

import "./CurrentUserSpots.css"

//get current user spots
const CurrentUserSpots = () => {

    const spots = useSelector(state => {
        return state.spots.allSpots;
    });
    const spot = useSelector(state => state.spots.spot)
    const sessionUser = useSelector(state => state.session.user);
    const spotsArr = Object.values(spots);
    // console.log('=============', spots)
    const dispatch = useDispatch();
    const history = useHistory();
    const goToSpot = (spotId) => {
        //    dispatch(getOneSpot(spotId))
        history.push(`/spots/${spotId}`)
    }

    useEffect(() => {
        dispatch(spotsActions.getUserSpots())
    }, [dispatch]);

    if (!spotsArr.length) return (
        <div className="user-none-spots">
            <h2>Sorry, you have not held any spot yet, please click become a host </h2>
        </div>)
    else {
        return (
            <>
                <div className="title-user">
                    <h2> {sessionUser.firstName}'s Spots</h2>
                </div>
                <div className='user-spots'>

                    {spotsArr.map(spot => (
                        <div key={spot.id}>

                            <div className='spot-card' onClick={() => goToSpot(spot.id)} >

                                <img className='spot-image' src={spot.previewImage} alt={spot.description} />
                                <div className='location'>{`${spot.city}, ${spot.state}`}</div>
                                <div className='price'>
                                    <span className='number'>{`$${spot.price}`}</span>
                                    <span className='night'>night</span>
                                </div>
                            </div>
                            <div className='spot-avgRating-all-spots'>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <span>{!Number(spot.avgRating) ? 'New' : Number(spot.avgRating).toFixed(1)}</span>

                            </div>
                            {sessionUser && sessionUser.id === spot?.ownerId && (
                                <div className='edit-div'>
                                    <UpdateSpotFormModal spot={spot} />
                                    <DeleteSpot />
                                </div>

                            )}


                        </div>

                    ))}

                </div>
            </>
        )

    }

}













export default CurrentUserSpots
