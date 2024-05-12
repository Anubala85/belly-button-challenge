# belly-button-challenge
**Overview**
This project provides insights into the different microbial communities present in individual samples by visualizing them into Bar and bubble charts. Leveraged the D3.js library and a comprehensive JSON dataset to generate visualizations for different samples that can be selected by users using an interative dropdown.
Final output is deployed onto [Github Pages](https://anubala85.github.io/belly-button-challenge/) for easy access. A snapshot of end result below:


<img width="812" alt="image" src="https://github.com/Anubala85/belly-button-challenge/assets/158111116/25b69907-32b7-4156-9b38-39a445fe5d3d">

**Bar Chart**
- Chart to visually show top 10 bacteria cultures against number of bacteria for a selected subject.
- Chart updates when a new sample is selected.
- Chart uses Top 10 sample values as values.
- Chart uses otu_ids as the labels.
- Chart uses otu_labels as the tooltip.
  
**Bubble Chart**
- Chart to visually display a bubble chart of Bacteria cultures per sample against OTU (Operational Taxonomic Units) ID.
- Chart updates when a new sample is selected.
- Chart uses otu_ids for the x values.
- Chart uses otu_ids for marker colors.
- Chart uses sample_values for the y values.
- Chart uses sample_values for the marker size.
- Chart uses otu_labels for text values.

**Metadata and Deployment**
- List of all Metadata is extracted from the JSON file and filtered only for the specific sample / subject.
- Metadata updates when a new sample is selected.
- App Successfully Deployed to Github Pages [here](https://anubala85.github.io/belly-button-challenge/).



