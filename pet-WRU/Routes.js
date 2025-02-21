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
router.post("/register", Controller.register );
router.post("/createFlyer", upload.single("animal_image_path"), Controller.createFlyer);


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