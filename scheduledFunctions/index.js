const CronJob = require("node-cron");

exports.initScheduledJobs = () => {
  const scheduledJobFunction = CronJob.schedule("0 3 * * *", () => {
    console.log("I'm executed on a schedule!");
    // Add your custom logic here
  });

  scheduledJobFunction.start();
}