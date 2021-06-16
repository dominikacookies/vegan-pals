const { Router } = require("express");

const router = Router();

const { User } = require("../models")

router.post("/signup",async(req,res)=>{
try {
    const newUser = await User.create(req.body)
    req.session.save(()=>{
        req.session.userId = newUser.id
        req.session.username = newUser.username
        req.session.loggedIn = true
        res.json(newUser)
    })
} catch(err){   
   return res.status(500).json(err)
}})

router.post("/login ",async(req,res)=>{
    try {
        const user = await User.findOne(
            {
                where: {
                    email:req.body.email
                },
            }
        )
        if (!user) {
            res.status(400).json({message:"can't find user!"})
            return 
        } 
        const validPassword = User.validatePassword(req.body.password)
        if (!validPassword) {
            res.status(400).json({message:"incorrect password!"})
            return 
        }
        req.session.save(()=>{
            req.session.userId = newUser.id
            req.session.username = newUser.username
            req.session.loggedIn = true
            res.json({user, message: "successfully logged in"})
        })
    } catch(err){   
       return res.status(500).json({message:"login unsuccessful"})
}})

router.post("/logout",(req,res)=>{
if(req.session.loggedIn) {
    req.session.destroy(()=>{
    res.status(204).end()
    }) 
} else {
    res.status(404).end()
}})
 
    




module.exports = router;
