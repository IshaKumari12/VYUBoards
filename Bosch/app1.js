// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create Express app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Mapping of events to be sent to the client
var eventMap = new Map([
    ['totalIN', 'updateTotalIN'],
    ['totalOUT', 'updateTotalOUT'],
    ['occupancy', 'updateOccupancy'],
    ['todayoccupancy', 'updatetodayoccupancy'],
    ['peakHour', 'updatePeakHour'],
    ['TodayIN', 'updateTodayIN'],
    ['todayOUT', 'updatetodayOUT'],
    ['floorIN', 'updatefloorIN'],
    ['floorOUT', 'updatefloorOUT'],
    ['floor2IN', 'updatefloor2IN'],
    ['floor2OUT', 'updatefloor2OUT'],
    ['cam', 'updatecam'],
    ['eventCount', 'updateeventCount'],
    ['peakCount', 'updatepeakCount'],
    ['Count', 'updateCount'],
    ['totalCAR', 'updatetotalCAR'],
    ['total2W', 'updatetotal2W'],
    ['totalTruck', 'updatetotalTruck'],
]);

app.use(bodyParser.json());
app.use(express.static(__dirname));
// Serves index.html to UI
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Receives data from Node-RED
app.post('/update-dashboard', (req, res) => {
    var data = req.body;
    console.log('Received data:', data);

    const TotalINMsg = { "payload": data[0] };
    console.log('data: ', data);

    var dataMap = processData(data);
    liveDataPush(dataMap);

    res.send('Data received successfully');
});

/** fetch the data from db */
const fetchChartsData = (req, res) => {
    // connect to db
    // write the query for fetching the data
    // send the data with 200 response
}

// Socket connection
io.on('connection', (socket) => {
    console.log('A user connected');
});

// process input data from node-red
function processData(data) {

    var dataMap = new Map();

    for (var i = 0; i < data.length; i++) {
        var unpack = new Map(Object.entries(data[i][0]));
        dataMap = new Map([...dataMap, ...unpack]);
    }
    console.log('Data Map: ', dataMap);

    return dataMap;
}

// push data to dashboard UI via socket
function liveDataPush(dataMap) {
    for (let [key, value] of dataMap.entries()) {
        if (eventMap.has(key))
            io.emit(eventMap.get(key), value);
    }
}

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Create a MySQL connection pool
