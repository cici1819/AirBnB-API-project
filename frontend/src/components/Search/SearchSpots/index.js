import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { thunkSearchSpots } from '../../../store/spots';
import { getKey } from '../../../store/maps';
import SearchPageMap from '../../Maps/SearchSpotsMap';
// import '../../AllSpotsList/AllSpotsList.css';
import './SearchSpots.css'


function SearchSpots() {
     const key = useSelector((state) => state.maps.key);
    const dispatch = useDispatch();
    const { keyword } = useParams();
    let markers = [];
    const spots = useSelector(state => Object.values(state.spots?.searchSpots));
    const spotsArr = Object.values(spots);
    console.log("spots",spots)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    useEffect(() => {
        dispatch(thunkSearchSpots(keyword))
            .then(() => setIsLoaded(true));
    }, [dispatch, keyword]);

    if (!key) {
        return null;
    }


    if (!spots || !spotsArr.length) return null;
    spots.forEach(spot => markers.push({ id: spot.id, price: ('$ ' + spot.price).toString(), position: { lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) } }))



    return (
        <div className='search-spots-container'>
            <div className='search-spots-container-left'>
                <div className='search-spots-list'>
                    {spotsArr.length > 0 ? (
                        spotsArr.map(spot => (
                            <div className='search-spot-card'>
                                <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                                    <div className='spot-img'>
                                        <img  src={spot.previewImage} alt='image' onError={e =>{e.currentTarget.src = "https://cici-aa.s3.us-west-1.amazonaws.com/error.jpg"}}/>
                                    </div>
                                    <div className='spot-details'>
                                        <div className='spot-info'>
                                            <div className='spot-info-city'>
                                                {`${spot.city}, ${spot.state}`}
                                            </div>
                                            <div className='spot-title-info'>
                                                <span id='fafastar'>
                                                    <i className="fa-solid fa-star" />
                                                </span>
                                                <span>{spot.avgRating ? spot.avgRating.toFixed(2) : 'New'}</span>
                                            </div>
                                        </div>

                                        <div className='spot-info-price'>
                                            <span>${spot.price} </span>night
                                        </div>

                                    </div>
                                </NavLink>
                            </div>
                        ))
                    ) : <>No Spots</>}

                </div>
            </div>
            <div className='search-spots-container-right'>
                <SearchPageMap apiKey={key} markers={markers} spots={spots} />
            </div>
        </div>

    )
}

export default SearchSpots;
