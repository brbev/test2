const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/students', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Add more routes for teachers, classes, etc.

module.exports = router;
