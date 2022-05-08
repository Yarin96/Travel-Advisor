import React, {useState} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = () =>{
    const classes = useStyles();
    const [type, setType] = useState('attractions');
    const [rating, setRating] = useState('');

    const places = [{ name: 'Cool Place'},
                    {name: 'Best Places'},
                    { name: 'Cool Place'},
                    {name: 'Best Places'},
                    { name: 'Cool Place'},
                    {name: 'Best Places'},
                    {name: 'Best Places'},
                    { name: 'Cool Place'},
                    {name: 'Best Places'},
                    { name: 'Cool Place'},
                    {name: 'Best Places'}
    ];

    return(
        <div className={classes.container}>
            <Typography variant="h4">
                Find Attractions, Restaurants and Hotels around you
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="attractions">Attractions</MenuItem>
                    <MenuItem value="restaurants">Restaurants</MenuItem>
                    <MenuItem value="hotels">Hotels</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3 Stars</MenuItem>
                    <MenuItem value={4}>Above 4 Stars</MenuItem>
                    <MenuItem value={4.5}>Above 4.5 Stars</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {/* Only if you have places, map over them */}
                {places?.map((place, i) => ( 
                    <Grid item key={i} xs ={12}>
                        <PlaceDetails place ={place}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default List;