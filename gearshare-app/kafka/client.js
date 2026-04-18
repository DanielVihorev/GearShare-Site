const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'gearshare-app',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  retry: { initialRetryTime: 100, retries: 8 },
});

module.exports = kafka;
