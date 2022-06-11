//require node modules
const fs = require('node:fs');
const path = require('node:path');

//file imports
const calculateSizeDirectory = require('./calculateSizeDirectory');
const calculateSizeFile = require('./calculateSizeFile');


const buildMainContent = (fullStaticPath, pathname) => {

    let mainContent = '';
    let items;

    //getting the elements inside the folder
    //will be stored as array
    try{
        items = fs.readdirSync(fullStaticPath);
    } catch(err){
        console.log(`readdirSync error: ${err}`);
        return '<div class="alert alert-danger"> Internal Server Error </div>';
    }  

    //Home directory, remove project files
    if(pathname === '/'){
        items = items.filter(element => element !== 'project files');
    }

    //loop through the elements inside the folder
    items.forEach(element => {
        //Storing the item details in an object
        let itemDetails = {};
        itemDetails.name = element;

        //link
        const link = path.join(pathname, element);

        const itemFullStaticPath = path.join(fullStaticPath, element);
        try{
            itemDetails.stats = fs.statSync(itemFullStaticPath);
        }catch(err){
            console.log(`statSync error: ${err}`);
            mainContent = '<div class="alert alert-danger">Internal Server Error</div>';
            return false;
        }

        //icon and item size
        if(itemDetails.stats.isDirectory()){
            itemDetails.icon = '<i class="bi bi-folder-fill"></i>';
        //    [itemDetails.size, itemDetails.sizeBytes] = calculateSizeDirectory(itemFullStaticPath);
            [itemDetails.size, itemDetails.sizeBytes] = ['10M', 2000];    //TEMPORARY
        }else if (itemDetails.stats.isFile()){
            itemDetails.icon = '<i class="bi bi-file-earmark-fill"></i>';
            [itemDetails.size, itemDetails.sizeBytes] = calculateSizeFile(itemDetails.stats);
        }   

        //last modified time (unix tims stamp)
        itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);

        //convert timestamp to a date
        itemDetails.date = new Date(itemDetails.timeStamp);
        itemDetails.date = itemDetails.date.toLocaleString();


        mainContent += `
<tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}" data-time="${itemDetails.timeStamp}">
    <td>${itemDetails.icon}<a href="${link}" target='${itemDetails.stats.isFile() ? "_blank" : ""}' > ${element}</a></td>
    <td>${itemDetails.size}</td>
    <td>${itemDetails.date}</td>
</tr>
    `;
    });
    return mainContent;
};

module.exports = buildMainContent;