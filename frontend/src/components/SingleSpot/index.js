import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as spotsActions from "../../store/spots";
import checkIn from "../../images/check-in.png"
import holder from "../../images/super-holder.png"
import cancel from "../../images/cancel.png"
import cover from "../../images/aircover.png"
import SingleSpotMapContainer from '../Maps/SingleSpotMap';




// import UpdateSpotForm from "../UpdateSpotFormModal/UpdateSpotForm"
import Reviews from '../Reviews';
// import * as reviewsActions from "../../store/reviews"

import './SingleSpot.css'
import CreateBooking from '../Booking/CreateBooking';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.spot);
    // console.log(spot, "state.spots.spot >>>>>>>>>>>>>>>>>")
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
    // if (!Object.values(spot).length) {
    //     //  console.log("Object_-------------")
    //     return null;
    // }
    if (!spot.SpotImages) {
        //  console.log("Object_-------------")
        return null;
    }
    const name = spot.name.split(' ')
    return (
        <>
            <div className='singlespot-details'>
                <div className="single-spot-top">
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
                        <div className='spot-imgs-prview-div'>
                            {/* {spot.SpotImages.map(img => ( */}
                            <img src={spot?.SpotImages[0]?.url} alt={spot?.SpotImages[0]?.url} className="spot-imgs-prview" onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}}/>

                        </div>
                        <div className='spot-imgs-small'>
                            <img src={spot.SpotImages[1] ? spot.SpotImages[1].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="samll-img1" onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}}/>
                            <img src={spot.SpotImages[2] ? spot.SpotImages[2].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img2" onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}}/>
                            <img src={spot.SpotImages[3] ? spot.SpotImages[3].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img3" onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}}/>
                            <img src={spot.SpotImages[4] ? spot.SpotImages[4].url : spot.SpotImages[0]?.url} alt={spot.SpotImages[0]?.url} className="small-img4" onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}}/>

                        </div>
                    </div>
                </div>

                <div className="single-spot-middle">

                    <div className='spot-middle-left'>

                        <div className='spot-owner'>
                            <h3>{name[0] + " "} Hosted By {spot.Owner?.firstName} {spot.Owner?.lastName}</h3>
                            <img src={spot.SpotImages[0]?.url} alt={spot.SpotImages.url} className="small-preview" onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}}/>
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

                        <div className='reviews'>
                            <Reviews reviews={reviews} />
                        </div>
                    </div>

                    <CreateBooking spot={spot} />

                </div>

                <div className='spot-one-map'>
                    <SingleSpotMapContainer spot={spot} />
                </div>
            </div>
        </>
    )
}

export default SingleSpot;
