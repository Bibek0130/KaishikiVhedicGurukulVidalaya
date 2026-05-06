// electriccenter.client\src\components\Maps\PoiMarkers.tsx
//for docs on map functionality on react : https://visgl.github.io/react-google-maps/docs/get-started
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { React, useCallback, useState } from 'react';
import { Circle } from './Map/Circle'


const PoiMarkers = ({ pois = [] }) => {
    const [circleCenter, setCircleCenter] = useState({
        lat: 27.7172,
        lng: 85.3240
    });
    //user interation like viewing lat and long
    const handleClick = useCallback((ev) => {
        if (!ev.latLng) return;

        setCircleCenter({
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng()
        });
    });
    return (
        <>
            <Circle
                radius={10}
                center={circleCenter}
                strokeColor={'#0c4cb3'}
                strokeOpacity={1}
                strokeWeight={3}
                fillColor={'#3b82f6'}
                fillOpacity={0.3}
            />
            {pois && pois.map((poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    onClick={handleClick}
                    clickable={true}
                >
                    <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};
export default PoiMarkers;