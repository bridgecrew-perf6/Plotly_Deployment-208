function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = sampleArray.filter(sampleObject => sampleObject.id == sample);


    //  5. Create a variable that holds the first sample in the array.
    var results = resultArray[0];
    console.log(results);


    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = results.otu_ids;
    var otu_labels = results.otu_labels;
    var sample_values = results.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticks = otu_ids.slice(0,10).map(ID => `<b>OTU ${ID}`).reverse();
    // var y = yticks.map(Id => `OTU ${otu_ids}`);
    // console.log();

    // 8. Create the trace for the bar chart. 
    var trace = [{
      x: sample_values.slice(0,10).reverse(),
      y: yticks,
      text: otu_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h",
      opacity: 2.5, 
      marker: {
        color: "rgb(158, 202, 225)",
        line: {
          color: "rgb(8,48,107)",
          width: 1.5
        }
      },
    }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found",
      width: 500, height: 500, 
      paper_bgcolor: "rgb(0,128,128)",
      margin: {  
        t: 30, 
        l: 125
      }};
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", trace, barLayout);

    // =======================================
    // ============== Deliver_2 ==============

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      type: "bubble",
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids, 
        colorscale: "Navy",
        line: {
          color: "black",
          width: 0.5
        }
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"}, 
      paper_bgcolor: "rgb(0,128,128)",
      height: 600, width: 1000
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // =================================================
    // =============== Deliver_3 =======================

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataArray = metadata.filter(sampleObject => sampleObject.id == sample);
    
    // Create a variable that holds the first sample in the array.
    // 2. Create a variable that holds the first sample in the metadata array.
    var results = metadataArray[0];

    // 3. Create a variable that holds the washing frequency.
    var washFreq =  parseFloat(results.wfreq); 
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
        domain: {x: [0,1], y:[0,1]},
        type: "indicator",
        mode: "gauge+number+delta",
        value: washFreq,
        title: { text: "<b>Belly Washing Frequency</b> <br> Scrubs per Week", font: { size: 20 } },
        gauge: {
          axis: { range: [0, 10], tickwidth: 2, tickcolor: "black" },
          bar: { color: "black" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange"},
            { range: [4, 6], color: "yellow"},
            { range: [6, 8], color: "yellowgreen"},
            {range: [8, 10], color: "green"}
          ]   
        }
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "rgb(0,128,128)",
        font: { color: "black", family: "Arial" }
      };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });


    
}
