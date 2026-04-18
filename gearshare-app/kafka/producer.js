const kafka = require('./client');
const TOPICS = require('./topics');

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('✅ Kafka Producer connected');
};

const emitGearBooked = async ({ bookingId, gearId, userId, startDate, endDate }) => {
  await producer.send({
    topic: TOPICS.GEAR_BOOKED,
    messages: [
      {
        key: gearId,
        value: JSON.stringify({
          eventType: 'GEAR_BOOKED',
          bookingId,
          gearId,
          userId,
          startDate,
          endDate,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });
};

const emitGearReturned = async ({ bookingId, gearId, userId, condition }) => {
  await producer.send({
    topic: TOPICS.GEAR_RETURNED,
    messages: [
      {
        key: gearId,
        value: JSON.stringify({
          eventType: 'GEAR_RETURNED',
          bookingId,
          gearId,
          userId,
          condition,
          timestamp: new Date().toISOString(),
        }),
      },
    ],
  });
};

module.exports = { connectProducer, emitGearBooked, emitGearReturned };
