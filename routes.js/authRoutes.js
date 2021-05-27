const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const router = express.Router()


router.post('/signup',async (req,res)=>{
    const {email, password} = req.body
    console.log(req.body)

    try{
        const user = new User({email,password})
        console.log(user)
        let saveUser = await user.save()
        console.log(saveUser)
        

        const token = jwt.sign({userId: user._id}, 'secret_key')
        res.send({token})
    } catch (err){
        res.status(422).send(err.message)
    }
    
})

router.post ('/changehubpassword',async(req,res)=>{
    const {email, newPassword, oldPassword} = req.body
    if (!email || !newPassword || !oldPassword){
        return res.status(403).send({error : 'All fields must be provided'})
    } 

    const user = await User.findOne({email})
    if (!user){
        return res.status(500).send({error : 'Invalid email, Password not changed'})
    }

    if(user.password === oldPassword){
        await User.findByIdAndUpdate(user._id, {
            password: newPassword    
        })
        const token = jwt.sign({userId:user._id},'secret_key')
        console.log(token)
        res.send({token})
    }

    if (user.password !== oldPassword){
        return res.status(403).send({error : 'incorrect old password '})
    }
})
router.post('/auth',async(req,res)=>{
    const {email, password} = req.body
    console.log('password is ..', password)
    console.log('email is ..', email)

    if (!email || !email){
        return res.status(422).send({error : 'Must provide email and password'})
    }

    const user = await User.findOne({email})
    console.log('user..',user)

    if (!user){
        return res.status(403).send({error : 'Invalid email'})
    }

    if (user.password === password){
        const token = jwt.sign({userId:user._id},'secret_key')
        console.log(token)
        res.send({token})
    }

    if (user.password !== password){
        return res.status(403).send({error : 'Invalid email or password'})
    }

    // try{
    //         await user.comparePassword(password)
            
    //         const token = jwt.sign({userId:user._id},'secret_key')
    //         console.log(token)
    //         return res.send({token})
        

    // } catch (err){
        
    //     return res.status(422).send({error : 'Invalid email or password'})
    // }
    

})

module.exports = router