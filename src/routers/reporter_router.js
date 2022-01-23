const express = require('express')
const router = express.Router()
const Reporter = require('../models/reporters')
const auth = require('../middleware/auth')

const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "egypt");

console.log(dateThailand); 

router.post('/signup', async (req, res) => {
    try {
        const reporter = new Reporter(req.body)
        await reporter.save()
        const token = await reporter.generatetoken()
        res.status(200).send({ reporter, token },)
        // const currentTime = new Date();

        // console.log(currentTime);
    

    } catch (e) {
        res.status(400).send(e.message)
    }



})

router.patch('/news/:id', auth, async (req, res) => {

    const _id = req.params.id
    try {
        const reporter = await Reporter.findByIdAndUpdate(_id, req.body,
            {
                new: true,
                runValidators: true
            })
        if (!reporter) {
            return res.status(404).send('unable')
        } res.send(reporter)



    } catch (e) {
        res.status(500).send(e.message)

    }


})



router.delete('/news/:id', auth, async (req, res) => {

    const _id = req.params.id
    try {
        const reporter = await Reporter.findByIdAndDelete(_id)

        if (!reporter) {
            return res.status(404).send('unable')
        } res.send(reporter)



    } catch (e) {
        res.status(500).send(e.message)

    }


})

router.post('/signin', async (req, res) => {

    try {
        const reporter = await Reporter.findByCredentails(req.body.email, req.body.password)
        const token = await reporter.generatetoken()
        res.status(200).send({ reporter, token })
    } catch (e) {
        res.status(400).send(e.message)

    }
})


router.delete('/logout', auth, async (req, res) => {
    try {
        console.log('test')
        req.reporter.tokens = req.reporter.tokens.filter((el) => {
            return el !== req.token


        })
        await req.reporter.save()
        res.send('logout succses')
    }
    catch (e) {
        res.status(500).send(e.message)

    }




})


module.exports = router