import axios from 'axios';

const restApi = {
    getRegionInfo: ( searchKey ) => {
        // try {
        //     console.log(searchKey);
        //     const keyword = searchKey + '.json?';
        //      const external = 'types=place%2Cregion%2Cpostcode%2Clocality&autocomplete=true&access_token=pk.eyJ1IjoiZ3JlZW5nb2F1dG9zIiwiYSI6ImNsbWF4MzJldjBzd24zanBjNTEyODc0NWEifQ.PNzoxe7zGiVBHP5gqQF2Tw';
        //     const url = 'https://cors-anywhere.herokuapp.com/https://api.mapbox.com/geocoding/v5/mapbox.places/' + keyword + external;
        //     const response = await axios.get( url );
        //     console.log(res);
        //     return response.data.features;
        // } catch (error) {
        //     return errorHandler(error);
        // }

        return new Promise((resolve, reject) => {
            const keyword = searchKey + '.json?';
            const external = 'types=place%2Cregion%2Cpostcode%2Clocality&autocomplete=true&access_token=pk.eyJ1IjoiZ3JlZW5nb2F1dG9zIiwiYSI6ImNsbWF4MzJldjBzd24zanBjNTEyODc0NWEifQ.PNzoxe7zGiVBHP5gqQF2Tw';
            const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + keyword + external;
            axios.get( url, { withCredentials: false } ).then(res => {
                resolve(res.data.features);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
export default restApi;