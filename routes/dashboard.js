const { Router } = require("express");
const router = Router();
const DashboardDao = require('../Dao/dashboarddao');

router.post("/upload", DashboardDao.addItems);

router.get("/getitemsbypref",async(req,res) =>{
    console.log(req.body)
    try {
        const { preference_description, preferences } = req.query;
        console.log("prefrences",preferences)
        console.log("desc",preference_description)
        const items = await   DashboardDao.getItemsByPref(preferences, preference_description)
        return res.status(200).json(items);
    } catch(e) {
        console.log("error in route",e)
        return res.status(500).json(e);
    }
})
router.post("/categories",DashboardDao.addcategory);

router.post("/subcategories",async(req,res) =>{
    try {
        const { name,category } = req.body;
    
        console.log("Received name:", name);  // Should not be undefined
        console.log("Received category:", category);  // Should not be undefined
        const subcategories = await   DashboardDao.addsubcategory(name,category)
        return res.status(200).json(subcategories);
    } catch(e) {
        return res.status(500).json(e);
    }
   
});


router.get("/categories",async(req,res) =>{
    try {
        const categories = await  DashboardDao.getcategories()
        return res.status(200).json(categories);
    } catch(e) {
        return res.status(500).json(e);
    }  
});
router.get("/subcategories/:category",async(req,res) =>{
    console.log(req.params)
    const category_id = req.params.category

    try {
        const subcategories = await DashboardDao.getsubcategories(category_id)
        return res.status(200).json(subcategories);
    } catch(e) {
        console.log(e)
        return res.status(500).json(e);
    }
});

router.get("/images", async (req, res, next) => {
    try {
        const imageresults = await DashboardDao.getImages()
        return res.status(200).json(imageresults);
    } catch(e) {
        return res.status(500).json(e);
    }
});
module.exports = router;