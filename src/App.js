import React, {useState, useEffect} from "react";
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './api';




function App() {

    const [places, setPlaces] = useState([]);

    useEffect(() => {
        getPlacesData() // This is async function so we need ".then"
            .then((data) => {
                 console.log(data);
                 setPlaces(data);
        })
    }, []); // The code of this function block will only happen in the start of the application
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing ={3} style={{ width: '100%' }} >
            {/* This grid is going to take full width on small devices, on medium devices and larger - it will take 4 spaces */}
                 <Grid item xs ={12} md={4}>
                    <List />
                 </Grid>
                 <Grid item xs ={12} md={8}>
                    <Map />
                </Grid>
            </Grid>
        </>
    );
}

export default App;