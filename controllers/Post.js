const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { PostModel } = require("../models");

/*
============================
LOG CREATE
============================
*/

router.post("/create", validateJWT, (req, res) => {

    const postEntry = {
        tripName: req.body.tripName,
        location: req.body.location,
        date: req.body.date,
        travelPartner: req.body.travelPartner,
        tripPlan: req.body.tripPlan,
        owner_id: req.user.id
   }
    PostModel.create(postEntry)
     .then(logs => res.status(200).json(logs))
     .catch(err => res.status(500).json({ error: err }))
});

/*
============================
GET ALL LOGS
============================
*/

router.get("/", async (req, res) => {
    try {
        const post = await PostModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
============================
GET POST BY USER
============================
*/

router.get("/mine", validateJWT, async (req, res) => {
    const { id } = req.user;
    try {
        const userPosts = await PostModel.findAll({
            where: {
                owner_id: id 
            }
        });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
============================
UPDATE A POST
============================
*/

router.put("/update/:entryId", validateJWT, async (req, res) => { 
    const { tripName, location, date, travelPartner, tripPlan } = req.body;
    const postId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: postId,
            owner_id: userId
        }
    };

    const updatedPost = {
        tripName: tripName,
        location: location,
        date: date,
        travelPartner: travelPartner,
        tripPlan: tripPlan
    };

    try {
        const update = await PostModel.update(updatedPost, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
============================
DELETE A POST ENTRY
============================
*/

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const postId = req.params.id;

    try {
        const query = {
            where: {
                id: postId,
                owner_id: ownerId
            }
        };

        await PostModel.destroy(query);
        res.status(200).json({ message: "Post Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router; 
