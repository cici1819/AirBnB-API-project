import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from "../../store/spots";
import checkIn from "../../images/check-in.png"
import holder from "../../images/super-holder.png"
import cancel from "../../images/cancel.png"
import cover from "../../images/aircover.png"



// import UpdateSpotForm from "../UpdateSpotFormModal/UpdateSpotForm"
import Reviews from '../Reviews';
// import * as reviewsActions from "../../store/reviews"

import './SingleSpot.css'

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.spot);
    console.log(spot, "state.spots.spot >>>>>>>>>>>>>>>>>")
    // console.log('single @@@@@@@@@@@@@@@@@@@@', spotId)
    const sessionUser = useSelector(state => state.session.user);

    // const getSpotReview = (spotId) => {
    //     dispatch(reviewsActions.getAllReviews(spotId))
    // }

    const reviews = useSelector(state => state.reviews.spot)

    useEffect(() => {
        dispatch(spotsActions.getOneSpot(spotId))
        //  console.log("dispatch+++++++++++++++++",)
    }, [dispatch, spotId, reviews])

    // console.log('single spot__________________', spot)
    if (!Object.values(spot).length) {
        //  console.log("Object_-------------")
        return null;
    }
    const name = spot.name.split(' ')
    return (
        <>
            <div className='singlespot-details'>
                <h2>{spot.name}</h2>

                <div className='spot-info-single'>
                    <div className='spot-avgRating-single'>
                        <i className="fa-sharp fa-solid fa-star"></i>
                        <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>

                    </div>
                    <div>
                        <span id='dots'>•</span>
                    </div>
                    <div className='reviews-num'>
                        <span className='numReviews'>{spot.numReviews} reviews
                        </span>
                    </div>
                    <div>
                        <span id='dots'>•</span>
                    </div>
                    <div className='spot-location'>
                        <span className='location'>
                            {`${spot.city}, ${spot.state}, ${spot.country}`}
                        </span>
                    </div>
                </div>
                <div className='spot-images'>
                    <div className='spot-imgs-prview'>
                        {/* {spot.SpotImages.map(img => ( */}
                        <img src={spot.SpotImages[0]?.url} alt={spot.SpotImages.url} />
                        {/* ))} */}
                    </div>
                    <div className='spot-imgs-small'>
                        <img src={spot.SpotImages[1] ? spot.SpotImages[1].url : spot.SpotImages[0].url} alt={spot.SpotImages.url} className="samll-img1" />
                        <img src={spot.SpotImages[2] ? spot.SpotImages[2].url : spot.SpotImages[0].url} alt={spot.SpotImages.url} className="small-img2" />
                        <img src={spot.SpotImages[3] ? spot.SpotImages[3].url : spot.SpotImages[0].url} alt={spot.SpotImages.url} className="small-img3" />
                        <img src={spot.SpotImages[4] ? spot.SpotImages[1].url : spot.SpotImages[0].url} alt={spot.SpotImages.url} className="small-img4" />

                    </div>
                </div>
                <div className='price-review-side-div'>
                    <div className="price-side-div">
                        <span className='s-number'>{`$${spot.price}`}</span>
                        <span className='s-night'> night</span>
                    </div>

                    <div className='review-side-div'>
                        <i className="fa-sharp fa-solid fa-star"></i>
                        <span> {!Number(spot.avgStarRating) ? "New" : Number(spot.avgStarRating).toFixed(1)}</span>
                        <span className='dots'> • </span>
                        <span className='numReviews'>{spot.numReviews} reviews
                        </span>
                    </div>
                </div>

                <div className='spot-owner'>
                    <h3>{name[0] + " " + name[1]} Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                    <img src={spot.SpotImages[0]?.url} alt={spot.SpotImages.url} className="small-preview" />
                </div>
                <div className='host-div1'>
                    <div className='host-div'>
                        <img src={checkIn} alt={"still load"} />
                        <div className='info'>
                            <div className='host-title'>
                                Self check-in
                            </div>
                            <div className='host-info1'>
                                Check yourself in with the lockbox.
                            </div>
                        </div>

                    </div>
                    <div className='host-div'>
                        <img src={holder} alt={"still load"} />
                        <div className='info'>
                            <div className='host-title'>
                                {spot.Owner?.firstName} is a Superhost
                            </div>
                            <div className='host-info' >
                                <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                            </div>
                        </div>


                    </div>
                    <div className='host-div3'>
                        <img src={cancel} alt={"still load"} />
                        <div className="host-title">
                            Free cancellation 48 hours before check in.
                        </div>
                    </div>
                </div>

                <div className='aircover'>
                    <div className='img-cover'>
                        <img src={cover} alt={"still load"} />
                    </div>

                    <div className='cover-info'>
                        Every booking includes free protection from Host cancellations, listing inaccuracies,
                        and other issues like trouble checking in.
                    </div>
                </div>
                <div className='spot-description'>
                    <p className='spot-description1'>{spot.description}</p>
                </div>

                <div className='reviews-details'>
                    <Reviews reviews={reviews} />
                </div>
            </div>
        </>
    )
}

export default SingleSpot;
