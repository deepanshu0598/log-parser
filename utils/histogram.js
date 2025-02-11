/**
 * Generates a histogram (frequency count) for the given data array.
 * @param {Array} data - An array of items for which the frequency count is needed.
 * @returns {Object} An object representing the histogram, where keys are unique items and values are their frequencies.
 */
function generateHistogram(data) {
    const histogram = {};  // Object to store the frequency count of each item
  
    // Iterate over each item in the data array
    data.forEach((item) => {
      // Increment the count for the current item in the histogram
      // If the item does not exist in the histogram yet, initialize it with 0 and then increment
      histogram[item] = (histogram[item] || 0) + 1;
    });
  
    // Return the completed histogram object
    return histogram;
  }
  
  // Export the generateHistogram function to be used in other modules
  module.exports = { generateHistogram };
  