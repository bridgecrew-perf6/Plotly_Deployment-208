// Addition with map() method
var numbers = [0,2,4,6,8];
var results = numbers.map(function(addition) {
    return addition+5;
})

// multiplication with map() method
var numbers = [1,2,3,4,5];
var doubled = numbers.map(function(num){
    return num * 2;
});
console.log(doubled);

// Using map() method to extract specific property from each object in an array
var cities = [
    {"Rank": 1,
    "City": "San Antonio ",
    "State": "Texas",
    "Increase_from_2016": "24208",
    "population": "1511946"},
    {"Rank": 2,
    "City": "Phoenix ",
    "State": "Arizona",
    "Increase_from_2016": "24036",
    "population": "1626078"},
    {"Rank": 3,
    "City": "Dallas",
    "State": "Texas",
    "Increase_from_2016": "18935",
    "population": "1341075"}
];

var cityNames = cities.map(function(city) {
    return city.population;
});

var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
var selectedWords = words.filter(function(sWord) {
    return sWord[0] == 's'
});