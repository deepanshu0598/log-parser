document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/data');
    const data = await response.json();
  
    const ipLabels = Object.keys(data.ipHistogram);
    const ipCounts = Object.values(data.ipHistogram);
  
    const hourLabels = Object.keys(data.hourlyHistogram);
    const hourCounts = Object.values(data.hourlyHistogram);
  
    new Chart(document.getElementById('ipChart'), {
      type: 'bar',
      data: {
        labels: ipLabels,
        datasets: [{ label: 'IP Address Occurrences', data: ipCounts, backgroundColor: 'rgba(75, 192, 192, 0.5)' }]
      }
    });
  
    new Chart(document.getElementById('hourlyChart'), {
      type: 'bar',
      data: {
        labels: hourLabels,
        datasets: [{ label: 'Hourly Traffic', data: hourCounts, backgroundColor: 'rgba(255, 99, 132, 0.5)' }]
      }
    });
  });
  