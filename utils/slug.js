/**
 * Slugify strings
 * @param {String} text text to slugify
 * @param {String} splitter 
 * @param {String} joinner 
 * @returns slugified string
 */
module.exports = function (text, splitter = "-", joinner = " "){
   return text.split(splitter).join(joinner)
}