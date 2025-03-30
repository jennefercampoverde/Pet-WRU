const pool = require("./Database"); // Import the database connection

// Route for testing donation filtering (server-side only debugging)
async function testFilterDonations(category, condition, sortBy) {
    let query = 'SELECT * FROM donations';
    const params = [];
    const conditions = [];
  
    if (category) {
      conditions.push('itemCategory = ?');
      params.push(category);
    }
  
    if (condition) {
      conditions.push('itemCondition = ?');
      params.push(condition);
    }
  
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
  
    if (sortBy === 'oldest') {
      query += ' ORDER BY dateCreated ASC';
    } else if (sortBy === 'newest') {
      query += ' ORDER BY dateCreated DESC';
    }

    try {
        const results = await pool.query(query, params); // Execute query with params
        console.log("Filtered Results:", results); // Print the results to the console for debugging
    } catch (error) {
        console.error("Error occurred:", error); // Log any error
    }
}

// Simulate a request with test parameters
testFilterDonations('Bedding', 'New', 'newest');