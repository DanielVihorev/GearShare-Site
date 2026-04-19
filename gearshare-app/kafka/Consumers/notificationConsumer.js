const kafka = require('../client');
const TOPICS = require('../topics');

// Replace these with your actual notification service calls
const sendEmail = async ({ to, subject, body }) => {
  console.log(`📧 Email to ${to}: [${subject}] ${body}`);
};

const sendSMS = async ({ to, message }) => {
  console.log(`📱 SMS to ${to}: ${message}`);
};

const consumer = kafka.consumer({ groupId: 'notification-service' });

const startNotificationConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topics: [TOPICS.GEAR_BOOKED, TOPICS.GEAR_RETURNED] });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const event = JSON.parse(message.value.toString());

      if (event.eventType === 'GEAR_BOOKED') {
        await sendEmail({
          to: event.userId,
          subject: 'Booking Confirmed!',
          body: `Your gear (${event.gearId}) is booked from ${event.startDate} to ${event.endDate}.`,
        });
      }

      if (event.eventType === 'GEAR_RETURNED') {
        if (event.condition === 'damaged') {
          await sendSMS({
            to: event.userId,
            message: 'Damage report filed for your recent return.',
          });
        }
      }
    },
  });

  console.log('✅ Notification consumer running');
};

module.exports = { startNotificationConsumer };
