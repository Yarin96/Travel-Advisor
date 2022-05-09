import React, {useState} from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles.js';

const Header = ({setCoords}) =>{
    
    const classes = useStyles();
    const[autocomplete, setAutocomplete] = useState({});
    
    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () =>{
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoords({lat,lng});
    }

    return(
        <AppBar position="static">
            <Toolbar className ={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                {/* Box is simply a div with more properties */}
                <Box display="flex"> 
                    <Typography variant="h6" className={classes.title}>
                         Vacation like a PRO!
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder='Type to Search' classes={{root: classes.inputRoot, input: classes.inputInput}}/>
                        </div>
                    </Autocomplete>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header;