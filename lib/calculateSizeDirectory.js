//require node modules
const execSync = require('child_process').execSync; 

const calculateSizeDirectory = (itemFullStaticPath) => {
    //escape spaces, tabs, etc
    const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g,'\ ');

    const commandOutput = execSync(`du -sh "${itemFullStaticPathCleaned}"`).toString();

    //remove spaces, tabs, etc
    let fileSize = commandOutput.replace(/\s/g,'');

    //split filesize using the '/' separator
    fileSize = fileSize.split('/');

    //human readable size is the first element of the array
    fileSize = fileSize[0];

    //unit
    const fileSizeUnit = fileSize.replace(/\d|\./g, '');

    //size number
    const fileSizeNumber = parseFloat(fileSize.replace(/[a-z]/i, ''));
    
    const units = "BKMGT";  //The different possible units

    //B 10B -> 10 bytes (*1024^0)
    //K 10K -> 10 * 1024 bytes (*1024^1)
    //M 10M -> 10 * 1024 * 1024 (*1024^2)
    //G 10G -> 10 * 1024 * 1024 * 1024 (*1024^3)
    //T 10G -> 10 * 1024 * 1024 * 1024 * 1024 bytes (*1024^4)

    const fileSizeBytes = fileSizeNumber * Math.pow(1024, units.indexOf(fileSizeUnit));

    return [fileSize, fileSizeBytes];
};

module.exports = calculateSizeDirectory;