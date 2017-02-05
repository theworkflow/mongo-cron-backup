const Logger = require('@modulus/logger')('mongo-cron-backup')

const Server = require('./server')
const Job = require('./lib/cron')

Server.start((err) => {
  if (err) throw err

  Logger.info(`Server running at ${Server.info.uri}`)
  Job.start()
})
