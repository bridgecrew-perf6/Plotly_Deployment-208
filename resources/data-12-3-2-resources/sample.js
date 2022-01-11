
d3.json("samples.json").then(function(data){
    console.log("hello");
});

// Get it to work
d3.json("samples.json").then(function(data){
    console.log("data");
});

// Using Object.entries to access object's keys and values
// researcher1 = {
//     name: "Roza", 
//     age: 34, 
//     hobby: "Hiking"
// };
// console.log(Object.entries(researcher1));

// Using forEach() to access to each element of an array
// researcher1 = [["name", "Roza"], ["age", 34], ["hobby", "Hiking"]];
// researcher1.forEach(([first, second]) => console.log(first + ": " + second));

// Update the json file code:
d3.json("samples.json").then(function(data) {
    firstPerson = data.metada[0];
    Object.entries(firstPerson).forEach(([key, value]) => 
    {console.log(key+ ": "+ value)});
});