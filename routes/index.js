const { Router } = require("express");
const router = Router();


router.use("/dashboard", require('./dashboard'));



router.use((err,req,res,next) => {
    if(err.message.includes("Cast to ObjectId failed")){
        return res.status(400).send("Invalid id provided")
    } else{
        console.log("hello error is",err.stack)
        res.status(500).send("Something broke!")
    }
});
module.exports = router;