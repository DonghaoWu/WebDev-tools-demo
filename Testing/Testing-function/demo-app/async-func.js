const fetch = require('node-fetch');

const getPeople = (callback) => {
    return callback('https://swapi.dev/api/people')
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            return {
                count: data.count,
                results: data.results
            }
        })
        .catch(error => {
            console.log(error);
        })
}

const getPeopleAsync = async (callback) => {
    try {
        const res = await callback('https://swapi.dev/api/people');
        const data = await res.json();
        // console.log(data);
        return {
            count: data.count,
            results: data.results
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getPeople,
    getPeopleAsync
}

// module.exports = {
//     getPeople:getPeople,
//     getPeopleAsync:getPeopleAsync
// }

// getPeople(fetch);
// getPeopleAsync(fetch);