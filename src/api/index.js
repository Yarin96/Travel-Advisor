import axios from 'axios'; // axios is a library which helps us make the calls

const URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';

const options = {
    params: {
      tr_longitude: '109.262909',
      tr_latitude: '12.346705',
      bl_longitude: '109.095887',
      bl_latitude: '12.113245'
    },
    headers: {
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
      'X-RapidAPI-Key': 'd6cf22c237msh5814a38a16fe8c6p1ec515jsn708a5759ff32'
    }
  };

export const getPlacesData = async () =>{
    try{
        // request | we want the data out of the response 
        const { data: {data}} = await axios.get(URL, options);
        return data;
    } catch(error){
        console.log(error);
    }
}