// Import required modules
const { parseLogFile } = require('./utils/fileParser');         // Function to parse the log file
const { generateHistogram } = require('./utils/histogram');     // Function to generate histogram from data
const { calculateTopContributors } = require('./utils/topContributors'); // Function to calculate top contributors
const chalk = require('chalk');                                // For colored console output
const fs = require('fs');                                      // File system module to read/write files

/**
 * Main function to execute the log file parsing, histogram generation,
 * and writing the output to a file.
 */
function main() {
  const logFilePath = 'sample-log-file.log';  // Path to the log file

  // Check if the log file exists. If not, show an error and exit.
  if (!fs.existsSync(logFilePath)) {
    console.error(chalk.red('❌ Log file not found! Please add a log file.'));
    process.exit(1);  // Exit the program with an error code
  }

  // Parse the log file to extract IP addresses and hours of traffic
  const { ipList, hourList } = parseLogFile(logFilePath);

  // Initialize an empty string to collect all output for writing to the file
  let output = '';

  // Generate and add IP address histogram to the output string
  output += '\nIP Address Histogram:\n';
  output += JSON.stringify(generateHistogram(ipList), null, 2) + '\n';

  // Generate and add hourly traffic histogram to the output string
  output += '\nHourly Traffic Histogram:\n';
  output += JSON.stringify(generateHistogram(hourList), null, 2) + '\n';

  // Calculate and add the top IP addresses contributing to 85% of traffic
  output += '\nTop IPs contributing to 85% traffic:\n';
  output += JSON.stringify(calculateTopContributors(generateHistogram(ipList), 85), null, 2) + '\n';

  // Calculate and add the top hours contributing to 70% of traffic
  output += '\nTop Hours contributing to 70% traffic:\n';
  output += JSON.stringify(calculateTopContributors(generateHistogram(hourList), 70), null, 2) + '\n';

  // Write the collected output string to a file named "output.txt"
  fs.writeFileSync('output.txt', output);

  // Log a success message in the console
  console.log(chalk.green('✅ Data has been written to output.txt successfully!'));
}

// Call the main function to execute the program
main();
