const express = require('express')
const router = express.Router()
const News = require('../models/news')
const auth = require('../middleware/auth')


router.post('/new', auth,async (req, res) => {
   
   
    try {
        // const dateNow = new Date();
        // postman.setGlobalVariable("todayDate", dateNow.toLocaleDateString());
        const news = new News({...req.body,owner:req.reporter._id})
        await news.save()
        res.send(news)
    } catch (e) {
        res.status(404).send(e.message)
    }


    console.log(currentTime);


})



router.patch('/new/:id', auth, async (req, res) => {

    const id = req.params.id
    try {
        const news = await News.findOneAndUpdate({id,owner:req.reporter._id}, req.body,
            {
                new: true,
                runValidators: true
            })
        if (!news) {
            return res.status(404).send('unable')
        } res.send(news)



    } catch (e) {
        res.status(500).send(e.message)

    }


})


router.delete('/new/:id',auth,async(req,res)=>{
    try{
        const _id  = req.params.id
        const news = await News.findOneAndDelete({_id,owner:req.user._id})
        if(!news){
            return res.status(404).send('No news')
        }
        res.send(news)
    }
    catch(e){
        res.send(e.message)
    }
})
module.exports=router