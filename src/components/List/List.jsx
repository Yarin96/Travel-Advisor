import React, {useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles.js';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) =>{

    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(()=>{
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        setElRefs(refs);
    }, [places]);

    return(
        <div className={classes.container}> 
            <Typography variant="h4">
                Find Attractions, Restaurants and Hotels around you
            </Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
            <>
            <FormControl className={classes.formControl}>
                <InputLabel id="type">Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="rating">Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="3">Above 3 Stars</MenuItem>
                    <MenuItem value="4">Above 4 Stars</MenuItem>
                    <MenuItem value="4.5">Above 4.5 Stars</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {/* Only if you have places, map over them */}
                {places?.map((place, i) => ( 
                    <Grid item key={i} xs ={12}>
                        <PlaceDetails
                            place ={place} 
                            selected={Number(childClicked === i)}
                            refProp={elRefs[i]}
                         />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    )
};

export default List;