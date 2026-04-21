const kafka = require('../client');
const TOPICS = require('../topics');

// Replace with your actual DB/search index update logic
const updateGearIndex = async ({ gearId, available }) => {
  console.log(`🔄 Gear ${gearId} availability updated → ${available}`);
};

const consumer = kafka.consumer({ groupId: 'availability-service' });

const startAvailabilityConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: [TOPICS.GEAR_BOOKED, TOPICS.GEAR_RETURNED] });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      const available = event.eventType === 'GEAR_RETURNED' && event.condition !== 'lost';

      await updateGearIndex({ gearId: event.gearId, available });
    },
  });

  console.log('✅ Availability consumer running');
};

module.exports = { startAvailabilityConsumer };
