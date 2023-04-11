// This file describes a function for consistent console logging


/**
 @description Helper function to help with consistent logging
* @param {string} type Type of message, eithor LOG or DEBUG
* @param {string} func Name of controller/ function
* @param {string} message Message
*/
function debuglog(type: String, func: String, message: String) {
    console.log(`[${type}] :: ${func} :: ${message} ::` + new Date() )
}
export {
    debuglog
}