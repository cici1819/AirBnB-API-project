import React, { useState } from 'react';
import { useHistory, NavLink } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import listIcon from '../../../images/listIcon.png';
import './MainPageMap.css';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: 35.34447416913044,
    lng: -100.07212787530635,
};


const MainPageGoogleMap = ({ apiKey, markers, spots }) => {
    const history = useHistory();
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });


    const handleActiveMarker = (marker) => {
        history.push(`/spots/${marker}`)
    };

    if (!markers.length) { return null }


    return (
        <div className='mainPage-map-container-outer'>
            {isLoaded && (
                <div className='mainPage-map-container'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={5.3}
                    >
                        {markers.map(({ id, price, position }) => (
                            <Marker
                                key={id}
                                position={position}
                                title={price}
                                onClick={() => handleActiveMarker(id)}
                            />
                        ))}
                    </GoogleMap>
                </div>
            )}
            <NavLink to={'/spots'} className='allSpots-list-container'>
                <div>Show list</div>
                <img src={listIcon} />
            </NavLink>
        </div>
    );
};

export default React.memo(MainPageGoogleMap);
