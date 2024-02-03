// Import required modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');


// Create Express app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
var eventMap = new Map([
    ['avg_speed','updateAverageSpeed'],
    ['plate_count','updatePlateCount'],
    ['employeeCount','updateEmployeeCount'],
    ['visiorCount','updateVisitorCount'],
    ['hour','updatepeakHour'],
    ['count','updateCount']
]);

app.use(bodyParser.json());

// serves index.html to UI
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// receives data from node-red
app.post('/update-dashboard', (req, res) => {
    var data = req.body;
    console.log('Received data:', data);

    const averageSpeedMsg = { "payload": data[0] };
    console.log('data: ', data);

    var dataMap = processData(data);
    liveDataPush(dataMap);

    res.send('Data received successfully');
});

// socket connection
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
