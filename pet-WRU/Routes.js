const express = require("express");
const router = express.Router();
const Controller = require("./Controllers");
const multer = require("multer");

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "projectImages/"); // Folder where images are stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });



// API Routes
router.post("/login", Controller.login);
router.post("/logout", Controller.logout);
router.post("/register", Controller.register);
router.get("/getUserID", Controller.getUserID);
router.post("/editUsername", Controller.editUsername);
router.post("/editPassword", Controller.editPassword);
router.post("/editEmail", Controller.editEmail);
router.post("/editZip", Controller.editZip);
router.post("/editCity", Controller.editCity);
router.post("/createFlyer", upload.single("animal_image_path"), Controller.createFlyer);
router.get("/missingPosts", Controller.missingPosts);
router.get("/selectedPostMap/:lostPetID", Controller.selectedPostMap); //shows the map for selected post
router.get("/showfoundPosts", Controller.showFoundPosts);
router.get("/showDonations", Controller.showDonations);
router.post("/editStatus", Controller.editStatus);
router.delete("/deleteFlyer/:lostID", Controller.deleteFlyer);
router.get("/userSelectedPost/:postID",Controller.userSelectedPost); //shows actual post

/*
router.get("/inventory", Controller.inventory);
router.post("/add-item", Controller.addItem);
router.delete("/delete-item/:id", Controller.deleteItem);
router.patch("/update-item/:id", Controller.updateItem);
router.get("/users", Controller.users)
router.post("/add-user", Controller.addUser);
router.delete("/delete-user/:id", Controller.deleteUser);
router.patch("/update-role/:id", Controller.updateRole);
*/

// Export the router
module.exports = router;