import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from "../../store/spots";
import DeleteSpot from "../DeleteSpot"
import UpdateSpotFormModal from '../UpdateSpotFormModal';
// import UpdateSpotForm from "../UpdateSpotFormModal/UpdateSpotForm"
import Reviews from '../Reviews';
// import * as reviewsActions from "../../store/reviews"

import './SingleSpot.css'

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.spot);
     console.log(spot,"state.spots.spot >>>>>>>>>>>>>>>>>")
    // console.log('single @@@@@@@@@@@@@@@@@@@@', spotId)
    const sessionUser = useSelector(state => state.session.user);

    // const getSpotReview = (spotId) => {
    //     dispatch(reviewsActions.getAllReviews(spotId))
    // }

    const reviews = useSelector(state => state.reviews.spot)

    useEffect(() => {
        dispatch(spotsActions.getOneSpot(spotId))
        //  console.log("dispatch+++++++++++++++++",)
    }, [dispatch, spotId,reviews])

    // console.log('single spot__________________', spot)
    if (!Object.values(spot).length) {
        //  console.log("Object_-------------")
        return null;
    }
    // console.log("spotImages**************", spot.spotImages)
    // console.log ("Owner33333333333333333",spot.Owner)
    return (
        <div className='singlespot-details'>
            <h2>{spot.name}</h2>

            <div className='spot-reviews-single'>
                <div className='spot-avgRating-single'>
                    <i className="fa-sharp fa-solid fa-star"></i>
                    <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
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
                    <img key={img.id} src={img.url} alt={img.url} className='img-details' />
                ))}
            </div>

            <div className='spot-owner'>
                <h3>Owner: {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
            </div>

            <div className='spot-description'>
                <p className='spot-description'>{spot.description}</p>
            </div>
            <div className='price'>
                <span className='number'>{`$${spot.price}`}</span>
                <span className='night'>night</span>
            </div>
            {sessionUser && sessionUser.id === spot.ownerId && (
            <div className='edit-div'>
                    <UpdateSpotFormModal spot={spot} />
                    <DeleteSpot />
                </div>
            )}
            <div className='reviews-details'>
                <Reviews reviews={reviews} />
            </div>
        </div>
    )
}

export default SingleSpot;
