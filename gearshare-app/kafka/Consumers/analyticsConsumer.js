const kafka = require('../client');
const TOPICS = require('../topics');

// Replace with your actual analytics DB logic
const logAnalyticsEvent = async (event) => {
  console.log(`📊 Analytics event:`, event);
};

const consumer = kafka.consumer({ groupId: 'analytics-service' });

const startAnalyticsConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topics: [TOPICS.GEAR_BOOKED, TOPICS.GEAR_RETURNED, TOPICS.ANALYTICS],
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      await logAnalyticsEvent(event);
    },
  });

  console.log('✅ Analytics consumer running');
};

module.exports = { startAnalyticsConsumer };
