import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab';
import useStyles from './styles';

const Map = () =>{
    const classes = useStyles(); // Use this as a hook
    const isMoblie = useMediaQuery('(min-width:600px'); // isMoblie will be false if the width of the device is larger than 600px 
    const coordinates = { lat: 0, lng: 0}; // latitude and longitude
    
    return(
            <div className={classes.mapContainer}>
                <GoogleMapReact 
                    bootstrapURLKeys={{key: 'AIzaSyAXd3p7hg_qhBqpFtLeZGwI-YUQFzV9IWQ'}} //
                    defaultCenter={coordinates}
                    center={coordinates} // The current center of the map
                    defaultZoom={14} 
                    margin={[50, 50, 50, 50]} // Top, Right, Bottom, Left
                    options={''}
                    onChange={''} // Important when you change the map
                    onChildClick={''} // Used when a user click on a resturant etc.
                >

                </GoogleMapReact>
            </div>
    )
}

export default Map;