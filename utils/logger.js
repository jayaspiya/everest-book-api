module.exports = function(req,_,next){
    console.log(req.method, req.url)
    next()
}