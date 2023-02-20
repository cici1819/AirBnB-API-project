import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getKey } from '../../../store/maps';
import * as spotsActions from "../../../store/spots";
import MainPageGoogleMap from './MainPageGoogleMap';


function MainPageMap() {
    const key = useSelector((state) => state.maps.key);
    // console.log('OneSpotMap component key-------------', key)
    const dispatch = useDispatch();
    let markers = [];
    const spots = Object.values(useSelector(state => state.spots.allSpots))

    useEffect(() => {
        if (!key) {
            dispatch(getKey());
        }
    }, [dispatch, key]);

    useEffect(() => {
        dispatch(spotsActions.getAllSpots())
    }, [dispatch]);

    if (!key) {
        return null;
    }

    spots.forEach(spot => markers.push({ id: spot.id, price: ('$ ' + spot.price).toString(), position: { lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) } }))
    if (!spots || !markers.length) { return null }

    return (
        <MainPageGoogleMap apiKey={key} markers={markers} spots={spots} />
    );
};

export default MainPageMap;
