const fetchdata = [];
var ctx = document.getElementById("chart1");
var chart2 = document.getElementById("chart2");
//   const express = require('express');
//   const mysql = require('mysql2');

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["2PM", "3PM", "4PM", "5PM", "6PM", "7PM"],
    datasets: [
      {
        label: "Maximum Occupany",
        data: [12, 19, 3, 5, 2, 3], // replace with inVals
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)", // Light Red
          "rgba(54, 162, 235, 0.7)", // Light Blue
          "rgba(255, 206, 86, 0.7)", // Light Yellow
          "rgba(75, 192, 192, 0.7)", // Light Green
          "rgba(153, 102, 255, 0.7)", // Light Purple
          "rgba(255, 159, 64, 0.7)", // Light Orange
        ],
        borderWidth: 1,
        borderRadius: 10, // Adjust the border radius for curved edges
        borderColor: "rgba(255, 255, 255, 0.8)", // Light border color
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          fontSize: 16, // Increase font size of the Y-axis labels
          color: "white", // Set font color to white for Y-axis labels
        },
        scaleLabel: {
          display: true,
          labelString: "Y-Axis Label",
          fontSize: 18, // Increase font size of the Y-axis label
          color: "white", // Set font color to white for Y-axis label
        },
      },
      x: {
        ticks: {
          fontSize: 16, // Increase font size of the X-axis labels
          color: "white", // Set font color to white for X-axis labels
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Set font color to white for legend text
        },
      },
    },
  },
});
var chart2 
function fetchData() {
  // Make a simple GET request
  fetch("http://localhost:4000/fetchingdata")
    .then((response) => {
      // Check if the request was successful (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      return response.json();
    })
    .then((data) => {
      // Handle the JSON data
      console.log(data);
      const hoursArray = data.map(item => item.Hour);
      const inCountArray = data.map(item => item.InCount);
      
      console.log('Hours Array:', hoursArray);
      console.log('InCount Array:', inCountArray);
      existingChart = charplot(hoursArray, inCountArray, existingChart);
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });
}
fetchData();

const intervalId = setInterval(fetchData, 3600000); // 60000 milliseconds = 1 minute

// Optionally, reload the page every one minute
// const reloadIntervalId = setInterval(() => {
//   location.reload();
// },15000);

// To stop the intervals when needed (e.g., when the page is refreshed)
window.addEventListener('beforeunload', () => {
  clearInterval(intervalId);
  //clearInterval(reloadIntervalId);
});

var timeVals = [
  "12AM",
  "1PM",
  "2PM",
  "3PM",
  "4PM",
  "5PM",
  "6PM",
  "7PM",
  "8PM",
  "9PM",
  "10PM",
  "11PM",
  "12PM",
  "12PM",
  "12PM",
  "12PM",
  "1AM",
  "2AM",
  "3AM",
  "4AM",
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "9AM",
  "10AM",
  "11AM",
];
var inVals = [
  2, 3, 5, 3, 8, 12, 13, 12, 10, 8, 8, 16, 20, 10, 11, 20, 14, 16, 19, 21, 22,
  23, 6, 7, 8, 9, 18,
];
let existingChart = null; // You can store the chart instance globally or wherever it's appropriate
existingChart = charplot(timeVals, inVals, existingChart);

//charplot(timeVals,inVals,chart2);
function charplot(timeVals,inVals,existingChart) {

  console.log(timeVals);
  console.log(inVals);


  // Destroy existing chart if it exists
  if (existingChart) {
    existingChart.destroy();
  }

 chart2 = new Chart(document.getElementById("chart2").getContext("2d"), {
  type: "line",
  data: {
    labels: timeVals,
    datasets: [
      {
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgba(255, 1, 255, 1)", // Violet background color
        borderColor: "rgba(255, 1, 255, 1)", // Violet border color
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 255, 255, 1.0)", // White color for data points
        pointRadius: 5,
        data: inVals,
        datalabels: {
          display: false,
          color: "white", // Set font color to white for labels
          font: {
            size: 17, // Set font size for labels
          },
        },
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          min: 0,
          max: Math.max(...inVals),
          fontSize: 16,
          color: "white",
        },
        scaleLabel: {
          display: true,
          labelString: "Y-Axis Label",
          fontSize: 18,
          color: "white",
        },
      },
      x: {
        ticks: {
          fontSize: 16,
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Maximum Head Count",
        color: "white",
        fontSize: 20,
      },
    },
  },
  plugins: [ChartDataLabels],
});

return chart2;

}

