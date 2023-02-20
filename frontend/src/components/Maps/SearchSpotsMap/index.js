import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import './SearchSpotsMap.css';

const containerStyle = {
    width: '53vw',
    height: 'calc(100vh - 95px)',

};

const SearchPageMap = ({ apiKey, markers, spots }) => {
    const history = useHistory();
    const center = {
        lat: markers[0].position.lat,
        lng: markers[0].position.lng,
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
    });


    const handleActiveMarker = (marker) => {
        history.push(`/spots/${marker}`)
    };

    return (
        <div className='searchPage-map-container'>
            {isLoaded && (
                <div className='mainPage-map-container'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={7.5}
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
        </div>
    );
};

export default React.memo(SearchPageMap);
