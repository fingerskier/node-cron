const self = {
  name: 'Test Task 1',
  description: 'Logs a message every 5 seconds',

  // cron string to run every 5 seonds
  cron: '*/5 * * * * *',
  task: async () => {
    console.log('testing...1')
  },
}


export default self