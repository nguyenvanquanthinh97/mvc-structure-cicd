const express = require('express');
const router = express.Router();

router.use("/api/v1/auth", require("./access"));
router.use("/api/v1/users", require("./users"));
router.use("/api/v1/products", require("./products"));


// test bullmq queue
const { reservedCheckoutQueue } = require('../queues/init.bullmq');

router.get('/api/v1/checkstatus', async (req, res, next) => {
    await reservedCheckoutQueue.add('sayHello', { name: 'World' }, { delay: 10000});
    res.status(200).json({
        status: 'success',
        message: 'api ok'
    })
})

module.exports = router;