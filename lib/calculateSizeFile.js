//require node modules

const calculateSizeFile = (stats) => {
    //size in bytes
    const fileSizeBytes = stats.size;

    //size in human readable format
    const units = "BKMGT";

    const index = Math.floor(Math.log10(fileSizeBytes)/3);

    //700 -> 700/1000^0
    //10000 -> 10000/1000^1
    //10000000 -> 10000000/1000^2
    const filesizeHuman = (fileSizeBytes/Math.pow(1000, index)).toFixed(1);

    const fileSize = `${filesizeHuman}${units[index]}`;

    return [fileSize, fileSizeBytes];
}

module.exports = calculateSizeFile;