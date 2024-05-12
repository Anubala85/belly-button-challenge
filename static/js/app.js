// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    var all_metadata = data.metadata;
    
    // Filter the metadata for the object with the desired sample number
    var sample_metadata = all_metadata.filter (sampleObj => sampleObj.id == sample)[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html ("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(sample_metadata).forEach(([key, value]) => {
      panel.append('h6').text(`${key.toUpperCase()}: ${value}`);
    })
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var all_samples = data.samples;

    // Filter the samples for the object with the desired sample number
    var sample_selected = all_samples.filter (sampleObj => sampleObj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sample_selected.otu_ids;
    let otu_labels = sample_selected.otu_labels;
    let sample_values = sample_selected.sample_values;

    // Build a Bubble Chart
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: 'Earth'
      }
    }];

    // Render the Bubble Chart
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 525,
      width: 1200,
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    var yticks = otu_ids.map(object => 'OTU ' + object);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    var yValues = yticks.slice (0,10).reverse();
    var xValues = sample_values.slice(0,10).reverse();
    var labels = otu_labels.slice(0,10).reverse();

    //console.log (yValues);
    //console.log (xValues);
    //console.log (labels);

    let barData = {
      x: xValues,
      y: yValues,
      text: labels,
      type: 'bar',
      orientation: 'h'
    };

    // Render the Bar Chart
    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      hoverlabel: { bgcolor: "#BAEEDE" },
      margin: { t: 50, l: 150 }
    };
    
    Plotly.newPlot('bar', [barData], barLayout);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let namesList = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownObj = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    Object.values(namesList).forEach(name => {
      dropdownObj.append('option').text(name);
    })

    // Get the first sample from the list
    firstSample = namesList[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata (newSample);
  buildCharts(newSample);
}

// Initialize the dashboard
init();
