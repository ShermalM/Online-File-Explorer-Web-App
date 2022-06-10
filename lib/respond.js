//respond to a request
//Following is a function passed to createServer used to create the server
const respond = (request, response) => {
    response.write('Testing - respond fired!');
    response.end();
}

module.exports = respond;