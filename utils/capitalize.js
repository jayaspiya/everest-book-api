module.exports = function(sentence){
    const arr = sentence.split(" ") 
    const arrNew = arr.map((word)=>{
        return word.charAt(0).toUpperCase() + word.slice(1)
    })
    return arrNew.join(" ")
} 