//^ Add function
export default function fetchCountries(searchName) {
    const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const properties = `fields=name,capital,population,flags,languages`;
    return fetch(`${BASE_URL}${searchName}?${properties}`)
        .then(response => {
        if (response.ok) {
        return response.json();
    }
    });
}



