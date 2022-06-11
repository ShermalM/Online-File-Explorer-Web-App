//require node modules
const path = require('node:path');

const buildBreadCrumb = pathname => {
    const pathChunks = pathname.split('/').filter(element => element !== '');

    let breadcrumb = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;

    let link = '/';
    pathChunks.forEach((element, index) => {
        link = path.join(link,element);
        if(index !== pathChunks.length - 1){
            breadcrumb += `<li class="breadcrumb-item"><a href="${link}">${element}</a></li>`;
        } else{
            breadcrumb += `<li class="breadcrumb-item active" aria-current="page">${element}</li>`;
        }
    });
    return breadcrumb;
};

module.exports = buildBreadCrumb;