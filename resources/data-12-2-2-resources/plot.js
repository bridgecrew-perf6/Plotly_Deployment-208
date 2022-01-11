// Verify the data correctly from data.js in plotly.js 
console.log(cityGrowths);

// sort descending and filter out the first 5 cities 
var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();
var topFiveCities = sortedCities.slice(0,5);

// create two arrays for city names and population growth
var topFiveCityNames = topFiveCities.map(topFiveCities => topFiveCities.City)
var topFiveCityGrowth = topFiveCities.map(topFiveCities => parseInt(topFiveCities.Increase_from_2016));

// Create bar chart with the arrays
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowth,
    type: "bar"
};
var data = [trace];
var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City"}, 
    yaxis: {title: "Population Growth, 2016-1017"}
};
Plotly.newPlot("bar-plot", data, layout);