import React from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles.js';

const PlaceDetails = ({place, selected, refProp }) =>{

    const classes = useStyles();
    if(selected) refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start"});

    return(
        <Card elevation={6}> 
            <CardMedia 
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : "https://www.marketing91.com/wp-content/uploads/2020/02/Definition-of-place-marketing.jpg"} 
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                {/**Fetch the ranking of the place */}
                <Box display="flex" justifyContent="space-between" my={2}>
                    <Rating name="read-only" size ="small" value ={Number(place.rating)} readOnly />
                    <Typography gutterBottom variant='subtitle1'>out of {place.num_reviews} reviews</Typography>
                </Box>
                {/**Fetch the prices of the place */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                </Box>
                {/**Fetch the ranking of the place */}
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {/**Fetch awards of the place */}
                {place?.awards?.map((award, i) => (
                    <Box key={i} my={1} display="flex" justifyContent="space-between" alignItems="center">
                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {/**Fetch the related catagories of the place */}
                {place?.cuisine?.map(({name}) => (
                    <Chip key={name} size="small" label={name} className={classes.chip}/>
                ))}
                {/**Fetch the adress of the place */}
                {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                        <LocationOnIcon /> {place.address}
                    </Typography>
                )}
                {/**Fetch the phone number of the place */}
                {place?.address && (
                    <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    {/**Opens the place in the trip advisor website in a new tab */}
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    {/**Opens the place website in a new tab */}
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

export default PlaceDetails;