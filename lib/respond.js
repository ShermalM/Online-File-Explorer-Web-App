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
        return false;
    }

    //Checking the result type, whether its a file or directory 
    let stats;
    try{
        stats = fs.lstatSync(fullStaticPath);
    } catch(err){
        console.log(`lstatSync Error: ${err}`);
    }

    //It's a Directory
    if(stats.isDirectory()){
        //get content from the template index.html
        let data = fs.readFileSync(path.join(STATICBASEPATH,'project files/index.html'), 'utf-8');

        //build the page title
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element !== '');
        const folderName = pathElements[0];
        data = data.replace('page_title', folderName);

        response.statusCode = 200;
        response.write(data);
        response.end();
    }

}

module.exports = respond;