// document.addEventListener('DOMContentLoaded', () => {
//   console.log('DOM content loaded');

//   fetch('/data')
//     .then(response => response.json())
//     .then(data => {
//       console.log('Data received:', data);
  
//         // Count entries and exits
//         const entryCount = rules.filter(rule => rule === 'IN').length;
//         const exitCount = rules.filter(rule => rule === 'OUT').length;
  
//         // Create a time series line chart
//         const ctx = document.getElementById('timeSeriesChart').getContext('2d');
//         const chart = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: timestamps,
//             datasets: [{
//               label: 'Entries',
//               data: Array.from({ length: timestamps.length }, () => entryCount),
//               borderColor: 'blue',
//               fill: false,
//             }, {
//               label: 'Exits',
//               data: Array.from({ length: timestamps.length }, () => exitCount),
//               borderColor: 'red',
//               fill: false,
//             }],
//           },
//           options: {
//             scales: {
//               x: {
//                 type: 'time',
//                 time: {
//                   unit: 'minute', // Adjust the unit as needed
//                 },
//               },
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           },
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   });
  