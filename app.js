//require node modules
const http = require('http');

//file imports
const respond = require('./lib/respond.js');

//connection settings
const PORT = process.env.port || 3000;

//Create Server
const server = http.createServer(respond);

//listen to client requests on the specified port, the port should be available
server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
}); 