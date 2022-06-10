//require node modules
const url = require('url');
const path = require('path');
const fs = require('fs');
//file imports


//static base path: location of the static folder
const STATICBASEPATH = path.join(__dirname,'..','static');


//respond to a request
//Following is a function passed to createServer used to create the server
const respond = (request, response) => {

    //Parsing the URL and getting the pathname
    let pathname = url.parse(request.url, true).pathname;

    //if favicon.ico then stop
    if(pathname === '/favicon.ico'){
        return false;
    }

    pathname = decodeURIComponent(pathname);

    //getting the corresponding full static path located in the static folder
    const fullStaticPath = path.join(STATICBASEPATH, pathname);

    //checking if the fullStaticPath corresponds with something inside the static folder
    if(!fs.existsSync(fullStaticPath)){
        response.write('404: File not found!');
        response.end();
    }else{
        response.write('File Found!');
        response.end();
    }

}

module.exports = respond;