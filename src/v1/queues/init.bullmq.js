const { Queue } = require('bullmq')

const redis = require('../databases/init.redis')

const reservedCheckoutQueue = new Queue('reservedCheckout', {
  connection: redis
})

module.exports = {
  reservedCheckoutQueue
}
