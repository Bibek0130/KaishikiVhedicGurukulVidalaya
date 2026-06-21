//for docs on map functionality on react : https://visgl.github.io/react-google-maps/docs/get-started
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';


const PoiMarkers = ({ pois = [] }) => {
    return (
        <>
            {pois && pois.map((poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}>
                    <Pin background={'#EA4335'} glyphColor={'#000'} borderColor={'#000'} />
                </AdvancedMarker>
            ))}
        </>
    );
};
export default PoiMarkers;
