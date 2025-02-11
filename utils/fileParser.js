const fs = require('fs');  // File system module to read log files

/**
 * Parses the log file to extract IP addresses and the hour of each request.
 * @param {string} filePath - Path to the log file.
 * @returns {object} An object containing two arrays: `ipList` and `hourList`.
 */
function parseLogFile(filePath) {
  // Regular expression to match IPv4 addresses (e.g., 192.168.1.1)
  const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
  
  // Regular expression to capture the hour from the timestamp (e.g., 17/May/2015:10 -> "10")
  const timePattern = /\[\d{2}\/[A-Za-z]{3}\/\d{4}:(\d{2})/;

  // Read the log file and split it by lines into an array
  const logData = fs.readFileSync(filePath, 'utf-8').split('\n');

  // Arrays to store extracted IP addresses and hours
  const ipList = [];
  const hourList = [];

  // Iterate over each log entry
  logData.forEach((log) => {
    // Find the first occurrence of an IP address in the current log line
    const ipMatch = log.match(ipPattern);
    
    // Find the first occurrence of an hour in the current log line
    const timeMatch = log.match(timePattern);

    // If both IP address and hour are found, store them in respective arrays
    if (ipMatch && timeMatch) {
      ipList.push(ipMatch[0]);       // Add the matched IP address to ipList
      hourList.push(timeMatch[1]);   // Add the matched hour to hourList
    }
  });

  // Return the extracted IP addresses and hours as an object
  return { ipList, hourList };
}

// Export the parseLogFile function to be used in other modules
module.exports = { parseLogFile };
