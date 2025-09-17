const { Worker } = require('bullmq');
const redis = require('../databases/init.redis');

const clearReservedCheckoutWorker = new Worker('reservedCheckout', async job => {
  const { name } = job.data;

  console.log(`Hello, ${name}!`);
}, { connection: redis });

module.exports = {
  clearReservedCheckoutWorker
}
