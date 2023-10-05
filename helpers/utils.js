function getUniqueID(type, count) {
    return new Promise((resolve, reject) => {
        let uniqueID = ""
        switch (type) {
            case "user":
                uniqueID = "U" + pad(6, count, '0')
                break;
            case "product":
                uniqueID = "P" + pad(6, count, '0')
                break;
            case "order":
                uniqueID = "O" + pad(6, count, '0')
                break;
            case "cart":
                uniqueID = "C" + pad(6, count, '0')
                break;
            default:
                uniqueID = "D" + pad(6, count, '0')
                break;
        }
        resolve(uniqueID)
    })
}

function pad(width, string, padding) {
    return (width <= string.length) ? string : pad(width, padding + string, padding)
}

module.exports = { getUniqueID }