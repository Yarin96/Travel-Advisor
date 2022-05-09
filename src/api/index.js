import axios from 'axios'; // axios is a library which helps us make the calls


export const getPlacesData = async (type, sw, ne) =>{
    try{
        // request | we want the data out of the response 
        const { data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            bl_latitude: sw.lat
          },
          headers: {
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          }
        });
        return data;
    } catch(error){
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
  try {
    if (lat && lng) {
      const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/weather', {
        params: {
          lat: lat,
          lon: lng,
        },
        headers: {
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        }
      });

      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
