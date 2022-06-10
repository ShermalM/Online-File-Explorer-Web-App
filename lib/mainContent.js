//require node modules
const fs = require('fs');
const path = require('path');

const buildMainContent = (fullStaticPath, pathname) => {

    let mainContent = '';
    let items;

    //loop through the elements inside the folder
    try{
        items = fs.readdirSync(fullStaticPath);
    } catch(err){
        console.log(`readdirSync error: ${err}`);
        return '<div class="alert alert-danger"> Internal Server Error </div>';
    }

    items.forEach(element => {
        //link
        const link = path.join(pathname, element);

        mainContent += `
<tr>
    <td><a href="${link}">${element}</a></td>
    <td>27M</td>
    <td>12/10/2018, 10:30:18 PM</td>
</tr>
    `;
    });
    return mainContent;
};

module.exports = buildMainContent;