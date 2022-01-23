const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(receivedData => console.log(receivedData));

// To retrieve full name of the Vandenberg Air Force Base
d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));

// map() to print only latitude and longitude coordinates of each SpaceX launch station
d3.json(url).then(location => location.map(results => console.log(results.location)));
    