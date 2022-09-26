import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from "../../store/spots";
import './SingleSpot.css'

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => {
        return state.spots.spot
    });
    // console.log(spot,"state.spots.spot >>>>>>>>>>>>>>>>>")
    // console.log('single @@@@@@@@@@@@@@@@@@@@', spotId)


    useEffect(() => {
        dispatch(spotsActions.getOneSpot(spotId))
        // console.log("dispatch+++++++++++++++++",)
    }, [dispatch, spotId])

    // console.log('single spot__________________', spot)
    if (!Object.keys(spot).length) {
        // console.log("Object_-------------")
        return null;
    }
    // console.log("spotImages**************", spot.spotImages)
    return (
        <div className='singlespot-details'>
            <h2>{spot.name}</h2>




            <div className='spot-reviews'>
                <div className='spot-avgRating'>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    {spot.avgStarRating
                        && Number(spot.avgStarRating
                        ).toFixed(1)}
                </div>
                <div className='reviews-num'>
                    <span className='numReviews'>{spot.numReviews} reviews
                    </span>
                </div>
            </div>
            <div className='spot-location'>
                <span className='location'>
                {`${spot.city}, ${spot.state}, ${spot.country}`}
            </span>
            </div>
            
            <div className='spot-imgs'>
                {spot.SpotImages.map(img => (
                    <img  src={img.url} alt={img.url} className='img-details' />
                ))}
            </div>

            <div className='spot-owner'>
                <h3>Owner: {spot.Owner.firstName} {spot.Owner.lastName}</h3>
            </div>

            <div className='spot-description'>
                <p className='spot-description'>{spot.description}</p>
            </div>
            <div className='price'>
                <span className='number'>{`$${spot.price}`}</span>
                <span className='night'>night</span>
            </div>
        </div>
    )
}

export default SingleSpot;
