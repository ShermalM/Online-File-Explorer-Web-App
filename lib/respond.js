//require node modules
const url = require('node:url');
const path = require('node:path');
const fs = require('node:fs');

//file imports
const buildBreadCrumb = require('./breadcrumb.js')
const buildMainContent = require('./mainContent.js');
const getMimeType = require('./getMimeType.js');

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

        //build breadcrumb
        const breadcrumb = buildBreadCrumb(pathname);
        

        //build  table rows (main content)
        const mainContent = buildMainContent(fullStaticPath, pathname);
        

        data = data.replace('page_title', folderName);
        data = data.replace('pathname', breadcrumb);
        data = data.replace('main_content', mainContent);
        response.statusCode = 200;
        response.write(data);
        return response.end();
    }

    //Is not a directory and not a file either
    // send 401: Access denied!
    if(!stats.isFile()){
        response.statusCode = 401;
        response.write('401: Access Denied!');
        console.log('Not a file!');
        return response.end();
    }


    //It is a file
    //Get the file extension
    let fileDetails = {};
    fileDetails.extname = path.extname(fullStaticPath);
    
    //Get the file mime type and add it to the response header
    getMimeType(fileDetails.extname)
    .then(mime => {
        console.log(mime);   
    })
    .catch(err => {
        response.statusCode = 500;  //Internal Server Error
        response.write(`500: Internal Server Error!`);
        console.log(`Promise error: ${err}`);
        return response.end();
    });
}

module.exports = respond;