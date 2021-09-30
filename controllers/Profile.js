const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { ProfileModel } = require("../models");


/*
============================
Profile CREATE
============================
*/
router.post("/create", validateJWT, (req, res) => {

    const profile = {
         fname: req.body.fname,
         age: req.body.age,
         hometown: req.body.hometown,
         favbev: req.body.favbev,
         wishlist: req.body.wishlist,
         owner_id: req.user.id
    }
    ProfileModel.create(profile)
     .then(logs => res.status(200).json(logs))
     .catch(err => res.status(500).json({ error: err }))
});

/*
============================
UPDATE A Profile
============================
*/

router.put("/update/:entryId", validateJWT, async (req, res) => { 
    const { fname, age, hometown, favbev, wishlist } = req.body;
    const profileId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: profileId,
            owner_id: userId
        }
    };

    const updatedProfile = {
        fname: fname,
        age: age,
        hometown: hometown,
        favbev: favbev,
        wishlist: wishlist
    };

    try {
        const update = await ProfileModel.update(updatedProfile, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

/*
============================
DELETE A PROFILE
============================
*/

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const profileId = req.params.id;

    try {
        const query = {
            where: {
                id: profileId,
                owner_id: ownerId
            }
        };

        await ProfileModel.destroy(query);
        res.status(200).json({ message: "Profile Removed"});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


module.exports = router; 
