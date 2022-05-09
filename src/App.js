import React, {useState, useEffect} from "react";
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = () => {

    const [places, setPlaces] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({});

    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('attractions');
    const [rating, setRating] = useState('');
    const [autocomplete, setAutocomplete] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoords({ lat: latitude, lng: longitude });
        });
    }, [])    // The code of this function block will only happen in the start of the application
              // it will force the coordinates to start at the user's location


    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating ); // if the rating of the place is larger than the current then we want to return that place.
        setFilteredPlaces(filtered);
    }, [rating]);



    useEffect(() => {
        if(bounds.sw && bounds.ne){ // If bounds is an empty object, it will be false
            setIsLoading(true);
            getWeatherData(coords.lat, coords.lng)
                .then((data) => setWeatherData(data));
            
            getPlacesData(type, bounds.sw, bounds.ne) // This is async function so we need ".then"
                .then((data) => {
                     setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                     setFilteredPlaces([]);
                     setRating('');
                     setIsLoading(false);
                });
        }
    }, [type, bounds]); 
    

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
         const lat = autocomplete.getPlace().geometry.location.lat();
         const lng = autocomplete.getPlace().geometry.location.lng();

        setCoords({ lat, lng });
    };

    return (
        <>
            <CssBaseline />
            <Header setCoords={setCoords} onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
            <Grid container spacing ={3} style={{ width: '100%' }} >
            {/* This grid is going to take full width on small devices, on medium devices and larger - it will take 4 spaces */}
                 <Grid item xs ={12} md={4}>
                    <List 
                          places={filteredPlaces.length ? filteredPlaces : places}
                          childClicked={childClicked}
                          isLoading={isLoading}
                          type={type}
                          setType={setType}
                          rating={rating}
                          setRating={setRating}
                    />
                 </Grid>
                 <Grid item xs ={12} md={8}>
                    <Map
                        setCoords = {setCoords}
                        setBounds = {setBounds}
                        coords = {coords}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                     />
                </Grid>
            </Grid>
        </>
    );
};

export default App;