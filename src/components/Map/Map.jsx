import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles.js';
import mapStyles from './mapStyles';

const Map = ({ setCoords, setBounds, coords, places, setChildClick, weatherData }) =>{

    const classes = useStyles(); // Use this as a hook
    const isDesktop = useMediaQuery('(min-width:600px)'); // isDesktop will be true if the width of the device is larger than 600px 
    
    return(
            <div className={classes.mapContainer}>
                <GoogleMapReact 
                    bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }} //
                    defaultCenter={coords}
                    center={coords} // The current center of the map
                    defaultZoom={14} 
                    margin={[50, 50, 50, 50]} // Top, Right, Bottom, Left
                    options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
                    onChange={(e) => {
                        setCoords({ lat: e.center.lat, lng: e.center.lng});
                        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                    }} // Important when you change the map
                    onChildClick={(child) => setChildClick(child)} // Used when a user click on a resturant etc.
                >
                    {places?.map((place) => (
                        <div
                            className={classes.markerContainer}
                            lat={Number(place.latitude)} // Convert the strings into numbers
                            lng={Number(place.longtitude)}
                        >
                            {
                                !isDesktop ? 
                                    <LocationOnOutlinedIcon color="primary" fontSize="large" />
                                 : (
                                    <Paper elevation={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant="subtitle2" gutterBottom >
                                            {place.name}
                                        </Typography>
                                        <img 
                                            className={classes.pointer} 
                                            src={place.photo ? place.photo.images.large.url : "https://www.marketing91.com/wp-content/uploads/2020/02/Definition-of-place-marketing.jpg"} 
                                            alt={place.name}
                                        />
                                        <Rating name="read-only" size ="small" value ={Number(place.rating)} readOnly />   
                                    </Paper>
                                )
                            }
                        </div>
                    ))}
                    {weatherData?.list?.map((data, i) => (
                        <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
                            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height={"70px"} alt ="Weather indicator"/>
                        </div>
                    ))}
                </GoogleMapReact>
            </div>
    );
};

export default Map;