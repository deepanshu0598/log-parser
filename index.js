const express = require('express');
const fs = require('fs');
const { parseLogFile } = require('./utils/fileParser');
const { generateHistogram } = require('./utils/histogram');
const { calculateTopContributors } = require('./utils/topContributors');

const app = express();
const PORT = 3000;

app.use(express.static('dashboard')); // Serve static files from the 'dashboard' folder

app.get('/data', (req, res) => {
  const logFilePath = 'sample-log-file.log';
  if (!fs.existsSync(logFilePath)) {
    return res.status(404).json({ error: 'Log file not found!' });
  }

  const { ipList, hourList } = parseLogFile(logFilePath);

  const data = {
    ipHistogram: generateHistogram(ipList),
    hourlyHistogram: generateHistogram(hourList),
    topIPs: calculateTopContributors(generateHistogram(ipList), 85),
    topHours: calculateTopContributors(generateHistogram(hourList), 70),
  };

  res.json(data); // Return the parsed data as JSON
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
