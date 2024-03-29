import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as spotsActions from "../../store/spots";
import mapIcon from "../../images/mapIcon.png"
import "./Spots.css"

//get all spots
const Spots = () => {
    const spots = useSelector(state => state.spots.allSpots);
    //  const spot = useSelector(state=>state.spots.spot)
    const spotsArr = Object.values(spots);
    // console.log('all spots...................' + spots)
    const dispatch = useDispatch();
    const history = useHistory();
    const goToSpot = (spotId) => {
        // dispatch(spotsActions.getOneSpot(spotId))
        history.push(`/spots/${spotId}`)
    }

    useEffect(() => {
        dispatch(spotsActions.getAllSpots())
    }, [dispatch]);

    if (!spotsArr.length) return null

    return (
        <div className='card'>
            <div className="spots-list">
                {spotsArr.map(spot => spot?.previewImage && (
                    <div key={spot.id} >

                        <div className='spot-card' onClick={() => goToSpot(spot.id)} >
                            <div className='img-container'>
                                <img className='spot-image' src={spot?.previewImage} alt={spot.description} onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}} />
                            </div>

                            <div className='location'>{`${spot.city}, ${spot.state}`}</div>
                            <div className='price'>
                                <span className='number'>{`$${spot.price}`}</span>
                                <span className='night'>night</span>
                            </div>
                            <div className='spot-avgRating-all-spots'>
                                <i className="fa-sharp fa-solid fa-star"></i>
                                <span>{!Number(spot.avgRating) ? 'New' : Number(spot.avgRating).toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <NavLink to={'/spotsmap'} className='allSpots-map'>
                <span className='title-s-m'>Show</span>
                <span> map</span>
                <img src={mapIcon} />
            </NavLink>
        </div>
    )
}

export default Spots;
