import express from 'express';
const router = express();

// Routes
router.use('/uneRoute', require('./exampleRoute'));

module.exports = router;