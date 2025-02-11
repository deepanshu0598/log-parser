/**
 * Calculates the top contributors from a histogram based on a specified cumulative percentage threshold.
 * @param {Object} histogram - An object representing the histogram (item-frequency pairs).
 * @param {number} percentage - The cumulative percentage threshold (e.g., 85 for 85%).
 * @returns {Array} An array of objects containing the top contributors up to the given percentage.
 */
function calculateTopContributors(histogram, percentage) {
    // Calculate the total number of occurrences across all items in the histogram
    const total = Object.values(histogram).reduce((sum, count) => sum + count, 0);
  
    let cumulative = 0; // Tracks the cumulative percentage of occurrences
    const topContributors = []; // Array to store the top contributors
  
    // Convert the histogram into an array of [item, count] pairs, sort it in descending order by count
    Object.entries(histogram)
      .sort((a, b) => b[1] - a[1]) // Sort by count in descending order
      .forEach(([item, count]) => {
        // Increment the cumulative percentage with the current item's contribution
        cumulative += (count / total) * 100;
  
        // Add the current item and its count to the top contributors list
        topContributors.push({ item, count });
  
        // Stop processing if the cumulative percentage reaches or exceeds the specified threshold
        if (cumulative >= percentage) return;
      });
  
    // Return the list of top contributors
    return topContributors;
  }
  
  // Export the calculateTopContributors function for use in other modules
  module.exports = { calculateTopContributors };
  