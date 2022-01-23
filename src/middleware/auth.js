const jwt =require ('jsonwebtoken')
const Reporter = require('../models/reporters')
const auth = async(req,res,next)=>{
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decode= jwt.verify(token,'nodecourse')
        const reporter = await Reporter.findOne({_id:decode._id,tokens:token})
        if(!reporter){
            console.log('i m here')
            throw new Error()
        }

        req.reporter=reporter
        req.token =token
        next()
    }catch(e){
        res.send('please Authorization')
    }


}
module.exports=auth