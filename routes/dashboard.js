const { Router } = require("express");
const router = Router();
const DashboardDao = require('../Dao/dashboarddao');

router.post("/upload", DashboardDao.setProfilePic);
router.get("/images", async (req, res, next) => {
    try {
        const imageresults = await DashboardDao.getImages()
        return res.status(200).json(imageresults);
    } catch(e) {
        next(e)
    }
});
module.exports = router;