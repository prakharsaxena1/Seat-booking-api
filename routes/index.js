const express = require('express');
const router = express.Router();

router.use('/api', require("./api.router"))

module.exports = router;