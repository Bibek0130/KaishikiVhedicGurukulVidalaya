import { APIProvider, Map } from '@vis.gl/react-google-maps';
import PoiMarkers from './PoiMarkers.jsx';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//27.739539671761737, 85.4346320963112    ;
const locations = [{ key: 'Kaishiki baidik Gurukul School', location: { lat: 27.739539671761737, lng: 85.4346320963112 } }];
function GoogleMap() {
    console.log("API_KEY", API_KEY);
  return (
      <div className="map-placeholder">
          <div>
              <APIProvider apiKey={API_KEY}>
                  <Map
                      style={{ width: '50vw', height: '50vh' }}
                      defaultZoom={20}
                      //27.739539671761737, 85.4346320963112
                      defaultCenter={{ lat: 27.73961824954405, lng: 85.43463513063703 }}
                      gestureHandling='greedy'
                      disableDefaultUI
                      mapId="DEMO_MAP_ID"
                  >
                      <PoiMarkers pois={locations} />
                  </Map>
              </APIProvider>
          </div>
      </div>
  );
}

export default GoogleMap;