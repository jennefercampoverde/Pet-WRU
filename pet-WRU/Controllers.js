const pool = require("./Database"); // Import the database connection
const bcrypt = require('bcryptjs');

//Route to check credentials at login
exports.login = async (req, res) => {
    const { UserName, userPassword } = req.body;

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM usersInfo WHERE userName = ?", [UserName]);

        if (result.length > 0) {
            const usersInfo = result[0];
            const passwordMatch = await bcrypt.compare(userPassword, usersInfo.userPassword);

            if (passwordMatch) {
                // Store user ID in the session
                req.session.userID = usersInfo.userID;
                console.log(`User logged in: ${usersInfo.firstName} ${usersInfo.lastName}, ID: ${req.session.userID}`);
                res.json({ ID: usersInfo.userID, success: true });

            } else {
                console.log(`Failed login attempt: ${UserName} (Invalid password)`);
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            console.log(`Failed login attempt: ${UserName} (User not found)`);
            res.status(404).json({ message: 'User not found' });
        }

        conn.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error when logging in' });
    }
};


//Route to log out of the session
exports.logout = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }
        console.log('User logged out successfully.');
        res.json({ message: 'Logout successful' });
    });
};


//Route to register an account with a hashed password
exports.register = async (req, res) => {
    const { UserName, FirstName, LastName, DOB, emailAddress, userPassword, Zipcode, City } = req.body;

    let hash;
    try {
        hash = await bcrypt.hash(userPassword, 10);
    } catch (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ error: 'Error hashing password' });
    }

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("INSERT INTO usersInfo (userName, firstName, lastName, dob, emailAddress, userPassword, zipcode, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [UserName, FirstName, LastName, DOB, emailAddress, hash, Zipcode, City]);

        console.log(`Account registered: ${FirstName} ${LastName}`);
        res.json({ message: 'Account created successfully!', success: true });
        conn.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error when creating an account' });
    }
};


//Route to send server side stored ID to client side
exports.getUserID = async (req, res) => {
    if (req.session.userID) {
        return res.json({ userID: req.session.userID });
    } else {
        return res.json({ userID: null });
    }
};


                                        //START OF ROUTES FOR EDITING ACCOUNT INFORMATION
//Edit username
exports.editUsername = async (req, res) => {
    const { userName } = req.body;

    // Ensure the new username is not empty or invalid
    if (!userName || userName.trim().length === 0) {
        return res.status(400).json({ error: 'Username cannot be empty' });
    }

    try {
        const conn = await pool.getConnection();

        // Ensure user is logged in
        const userID = req.session.userID;
        if (!userID) {
            conn.release();
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Check if user exists
        const [rows] = await conn.query("SELECT * FROM usersInfo WHERE userID = ?", [userID]);

        if (rows.length === 0) {
            conn.release();
            return res.status(404).json({ error: "User not found" });
        }

        // Update the username in the database
        const result = await conn.query("UPDATE usersInfo SET userName = ? WHERE userID = ?", [userName, userID]);
        conn.release();

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "No changes made to the account" });
        }

        console.log(`Username updated for userID: ${userID}`);
        res.json({ message: 'Username updated successfully!', success: true });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: 'Database error when updating account' });
    }
};


//Edit password
exports.editPassword = async (req, res) => {
    const { userPassword } = req.body;

    // Ensure the new password is not empty or invalid
    if (!userPassword || userPassword.trim().length === 0) {
        return res.status(400).json({ error: 'Password cannot be empty' });
    }

    try {
        const conn = await pool.getConnection();

        // Ensure user is logged in
        const userID = req.session.userID;
        if (!userID) {
            conn.release();
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Check if user exists
        const [rows] = await conn.query("SELECT * FROM usersInfo WHERE userID = ?", [userID]);

        if (rows.length === 0) {
            conn.release();
            return res.status(404).json({ error: "User not found" });
        }

        //hash new password
        let hash;
        try {
            hash = await bcrypt.hash(userPassword, 10);
        } catch (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ error: 'Error hashing password' });
        }

        // Update the password in the database
        const result = await conn.query("UPDATE usersInfo SET userPassword = ? WHERE userID = ?", [hash, userID]);
        conn.release();

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "No changes made to the account" });
        }

        console.log(`Password updated for userID: ${userID}`);
        res.json({ message: 'Password updated successfully!', success: true });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: 'Database error when updating account' });
    }
};


//Edit email
exports.editEmail = async (req, res) => {
    const { emailAddress } = req.body;

    // Ensure the new email is not empty or invalid
    if (!emailAddress || emailAddress.trim().length === 0) {
        return res.status(400).json({ error: 'Email cannot be empty' });
    }

    try {
        const conn = await pool.getConnection();

        // Ensure user is logged in
        const userID = req.session.userID;
        if (!userID) {
            conn.release();
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Check if user exists
        const [rows] = await conn.query("SELECT * FROM usersInfo WHERE userID = ?", [userID]);

        if (rows.length === 0) {
            conn.release();
            return res.status(404).json({ error: "User not found" });
        }

        // Update the email in the database
        const result = await conn.query("UPDATE usersInfo SET emailAddress = ? WHERE userID = ?", [emailAddress, userID]);
        conn.release();

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "No changes made to the account" });
        }

        console.log(`Email updated for userID: ${userID}`);
        res.json({ message: 'Email updated successfully!', success: true });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: 'Database error when updating account' });
    }
};


//Edit zipcode
exports.editZip = async (req, res) => {
    const { zipcode } = req.body;

    // Ensure the new zipcode is not empty or invalid
    if (!zipcode || zipcode.trim().length === 0) {
        return res.status(400).json({ error: 'Zipcode cannot be empty' });
    }

    try {
        const conn = await pool.getConnection();

        // Ensure user is logged in
        const userID = req.session.userID;
        if (!userID) {
            conn.release();
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Check if user exists
        const [rows] = await conn.query("SELECT * FROM usersInfo WHERE userID = ?", [userID]);

        if (rows.length === 0) {
            conn.release();
            return res.status(404).json({ error: "User not found" });
        }

        // Update the zipcode in the database
        const result = await conn.query("UPDATE usersInfo SET zipcode = ? WHERE userID = ?", [zipcode, userID]);
        conn.release();

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "No changes made to the account" });
        }

        console.log(`Zipcode updated for userID: ${userID}`);
        res.json({ message: 'Zipcode updated successfully!', success: true });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: 'Database error when updating account' });
    }
};


//Edit City
exports.editCity = async (req, res) => {
    const { city } = req.body;

    // Ensure the new city is not empty or invalid
    if (!city || city.trim().length === 0) {
        return res.status(400).json({ error: 'City cannot be empty' });
    }

    try {
        const conn = await pool.getConnection();

        // Ensure user is logged in
        const userID = req.session.userID;
        if (!userID) {
            conn.release();
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Check if user exists
        const [rows] = await conn.query("SELECT * FROM usersInfo WHERE userID = ?", [userID]);

        if (rows.length === 0) {
            conn.release();
            return res.status(404).json({ error: "User not found" });
        }

        // Update the city in the database
        const result = await conn.query("UPDATE usersInfo SET city = ? WHERE userID = ?", [city, userID]);
        conn.release();

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "No changes made to the account" });
        }

        console.log(`City updated for userID: ${userID}`);
        res.json({ message: 'City updated successfully!', success: true });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: 'Database error when updating account' });
    }
};
                                        //END OF ROUTES FOR EDITING ACCOUNT INFORMATION


//Route to create a flyer
exports.createFlyer = async (req, res) => {
    try {
        const { dateLost, lastZipcode, lastCityID, 
                petName, animalType, animalSize, animalColor, animalGender, 
                description } = req.body;
        
        // Get user ID from session
        const userID = req.session.userID;
        if (!userID) {
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Get file path if an image is uploaded
        const fileInput = req.file ? req.file.filename : null;

        // Default status
        const status = "Lost";

        // Insert into database
        const conn = await pool.getConnection();
        await conn.query(`INSERT INTO lostPets (userID, dateLost, lastZipcode, lastCityID, petName, animalType, animalSize, animalColor, animalGender, animal_image_path, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                [userID, dateLost, lastZipcode, lastCityID, petName, animalType, animalSize, animalColor, animalGender, fileInput, description, status]);

        conn.release();

        console.log(`Flyer created successfully.`);
        res.json({ message: "Flyer created successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error when creating a flyer" });
    }
};


// LOAD MISSING PET POSTS ROUTE 
exports.missingPosts = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM lostPets");
        res.json(rows);
        conn.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error. Unable to grab information from lostPets table.' });
    }
};


// Route to load map for selected page
exports.selectedPostMap = async (req, res) => {
    const {lostPetID} = req.params;

    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT lastZipcode, lastCityID FROM lostpets WHERE lostID = ?", [lostPetID]);
        res.json(rows);
        conn.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error. Unable to grab information from lostPets table.' });
    }
};


//ROUTE TO SHOW THE FOUND PETS
exports.showFoundPosts = async(req, res) => {

    try{ 
        const conn = await pool.getConnection();
        const rows= await conn.query("SELECT foundPets.dateFound, lostPets.petName, lostPets.status, lostPets.animal_image_path From foundPets INNER JOIN lostPets ON lostPets.lostID=foundPets.lostID");
        res.json(rows);
        conn.release();
    } 
    catch (err)
    {
        console.error(err);
        res.status(500).json({error:'Database error. Unable to grab information from lostPets table.'});
    }
};


//ROUTE TO SHOW THE DONATIONS PAGE
exports.showDonations = async(req, res) => {

    try{
        const conn= await pool.getConnection();
        const rows= await conn.query("SELECT * FROM donations");
        res.json(rows);
        conn.release();
    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({error:'Database error. Unable to grab information from donations table.'});
    }
};


//Route to update missing pet post status
exports.editStatus = async (req, res) => {
    const { lostID, status } = req.body;

    // Ensure the new username is not empty or invalid
    if (!status || status.trim().length === 0) {
        return res.status(400).json({ error: 'Status cannot be empty' });
    }

    try {
        const conn = await pool.getConnection();

        // Ensure user is logged in
        const userID = req.session.userID;
        if (!userID) {
            conn.release();
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Check if flyer exists
        const [rows] = await conn.query("SELECT * FROM lostpets WHERE lostID = ?", [lostID]);

        if (rows.length === 0) {
            conn.release();
            return res.status(404).json({ error: "Flyer not found" });
        }

        // Update the flyer in the database
        const result = await conn.query("UPDATE lostpets SET status = ? WHERE lostID = ?", [status, lostID]);
        conn.release();

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "No changes made to the flyer" });
        }

        console.log(`Status updated for flyer`);
        res.json({ message: 'Flyer updated successfully!', success: true });

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: 'Database error when updating flyer' });
    }
};


//Route to delete missing pet posts
exports.deleteFlyer = async (req, res) => {
    const { lostID } = req.params;
    const conn = await pool.getConnection();

    try {
        await conn.beginTransaction(); // Start a transaction

        // Delete child entries first
        const result1 = await conn.query("DELETE FROM postcomments WHERE lostID = ?", [lostID]);
        const result2 = await conn.query("DELETE FROM foundpets WHERE lostID = ?", [lostID]);
        const result3 = await conn.query("DELETE FROM lostpets WHERE lostID = ?", [lostID]);

        if (result3[0].affectedRows === 0) {
            await conn.rollback(); // Rollback if no rows were deleted in the main table
            conn.release();
            return res.status(400).json({ error: "No changes made to the flyer" });
        }

        await conn.commit(); // Commit the transaction
        conn.release();

        res.json({ success: true, message: "Flyer and related entries deleted successfully." });
    } catch (error) {
        await conn.rollback(); // Rollback on error
        conn.release();
        console.error("Error deleting flyer:", error);
        res.status(500).json({ error: "Database error when deleting flyer" });
    }
};


// Route for the selected post page 
exports.userSelectedPost = async (req,res)=>{
    const {postID}=req.params;
    try{
        const conn= await pool.getConnection();
        const rows= await conn.query("SELECT * FROM lostPets WHERE lostID = ?",[postID]);
        res.json(rows);
        conn.release();
    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({error:'Database error. Unable to grab information about selected post table.'});
    }

};


// Route for the comments for selected post page 
exports.showComments = async (req,res)=>{
    const { postID }=req.params;
    
    try{
        const conn= await pool.getConnection();
        const rows= await conn.query("SELECT * FROM postComments WHERE lostID= ?",[postID]);
        res.json(rows);
        conn.release();
    }
    catch (err)
    {
        console.error(err);
        res.status(500).json({error:'Database error. Unable to grab information about comments selected post table.'});
    }

};


//Route to create a flyer
exports.createDonation = async (req, res) => {
    try {
        const { DonationName, quantity, category, 
            condition, description } = req.body;
        
        // Get user ID from session
        const userID = req.session.userID;
        if (!userID) {
            return res.status(401).json({ error: "Unauthorized. Please log in." });
        }

        // Get file path if an image is uploaded
        const fileInput = req.file ? req.file.filename : null;

        // Default item status
        const itemStatus = "Available";

        // Pull user data from database
        const conn = await pool.getConnection();
        const result = await conn.query("SELECT * FROM usersInfo WHERE userID = ?", [userID]);
        const usersInfo = result[0];

        // Insert into database
        await conn.query(`INSERT INTO donations (userID, zipcode, itemStatus, itemCategory, itemName, quantity, itemCondition, itemDescription, item_image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                                                [userID, usersInfo.zipcode, itemStatus, category, DonationName, quantity, condition, description, fileInput ]);

        conn.release();

        console.log(`Donation listed successfully.`);
        res.json({ message: "Donation listed successfully!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error when listing a donation" });
    }
};













// ADD ITEM ROUTE 
exports.addItem = async (req, res) => {
    const { item_name, item_price, quantity } = req.body;
    console.log(`[POST /add-item] Adding item: ${item_name}, Quantity: ${quantity}`);

    try {
        const conn = await pool.getConnection();

        // Insert the new item into the inventory table
        const result = await conn.query(
            "INSERT INTO inventory (item_name, item_price, quantity) VALUES (?, ?, ?)",
            [item_name, item_price, quantity]
        );

        console.log(`Item added: ${item_name}, Price: ${item_price}, Quantity: ${quantity}`);
        res.json({ message: 'Item added successfully!' });

        conn.release();
    } catch (err) {
        console.error(`[POST /add-item] Error adding item:`, err);
        res.status(500).json({ error: 'Failed to add item' });
    }
};

// DELETE ITEM ROUTE (Admin Only)
exports.deleteItem = async (req, res) => {
    const { id } = req.params;

    console.log(`Received DELETE request to delete item with ID: ${id}`); // Added log to confirm route is hit

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM inventory WHERE id = ?", [id]);
        conn.release();

        if (result.affectedRows > 0) {
            console.log(`Item with ID ${id} deleted successfully.`); // Log successful deletion
            res.json({ message: 'Item deleted successfully!' });
        } else {
            console.log(`Item with ID ${id} not found in the database.`); // Log not found
            res.status(404).json({ error: 'Item not found.' });
        }
    } catch (err) {
        console.error(`[DELETE /delete-item/:id] Error deleting item:`, err);
        res.status(500).json({ error: 'Failed to delete item' });
    }
};

// UPDATE ITEM ROUTE
exports.updateItem = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    console.log(`Received UPDATE request to update item with ID: ${id}`); // Added log to confirm route is hit

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE inventory SET quantity = ? WHERE id = ?", [quantity, id]);
        conn.release();

        if (result.affectedRows > 0) {
            console.log(`Item with ID ${id} updated successfully.`); // Log successful update
            res.json({ message: 'Item updated successfully!' });
        } else {
            console.log(`Item with ID ${id} not found in the database.`); // Log not found
            res.status(404).json({ error: 'Item not found.' });
        }
    } catch (err) {
        console.error(`[PATCH /update-item/:id] Error updating item:`, err);
        res.status(500).json({ error: 'Failed to update item' });
    }

}

// LOAD USER LIST ROUTE (Admin Only)
exports.users = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM users");
        res.json(rows);
        conn.release();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
};

// ADD USER ROUTE (Admin Only)
exports.addUser = async (req, res) => {
    const { username, password, firstName, lastName, role } = req.body;
    console.log(`[POST /add-user] Adding User: ${firstName} ${lastName}`);

    try {
        const conn = await pool.getConnection();

        // Hash the user's password
        let hash;
        try {
            hash = await bcrypt.hash(password, 10);
        } catch (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({ error: 'Error hashing password' });
        }

        // Insert the new user into the inventory table
        const result = await conn.query(
            "INSERT INTO users (username, password, firstName, lastName, role) VALUES (?, ?, ?, ?, ?)",
            [username, hash, firstName, lastName, role]
        );

        console.log(`User added: ${firstName} ${lastName}, Role: ${role}`);
        res.json({ message: 'User added successfully!' });

        conn.release();
    } catch (err) {
        console.error(`[POST /add-user] Error adding user:`, err);
        res.status(500).json({ error: 'Failed to add user' });
    }
};

// DELETE ITEM ROUTE (Admin Only)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    console.log(`Received DELETE request to delete user with ID: ${id}`); // Added log to confirm route is hit

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM users WHERE id = ?", [id]);
        conn.release();

        if (result.affectedRows > 0) {
            console.log(`User with ID ${id} deleted successfully.`); // Log successful deletion
            res.json({ message: 'User deleted successfully!' });
        } else {
            console.log(`User with ID ${id} not found in the database.`); // Log not found
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        console.error(`[DELETE /delete-user/:id] Error deleting user:`, err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// UPDATE USER ROLE ROUTE (Admin Only)
exports.updateRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    console.log(`Received UPDATE request to update user role with ID: ${id}`); // Added log to confirm route is hit

    try {
        const conn = await pool.getConnection();
        const result = await conn.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
        conn.release();

        if (result.affectedRows > 0) {
            console.log(`User with ID ${id} updated successfully.`); // Log successful update
            res.json({ message: 'User role updated successfully!' });
        } else {
            console.log(`User with ID ${id} not found in the database.`); // Log not found
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (err) {
        console.error(`[PATCH /update-role/:id] Error updating user role:`, err);
        res.status(500).json({ error: 'Failed to update user role' });
    }

}
