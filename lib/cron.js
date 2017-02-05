const Backup = require('s3-mongodump')
const { CronJob } = require('cron')
const Logger = require('@modulus/logger')('cron')

const Config = require('../config')

const getOptionsFromConfig = (config) => ({
  host: config.mongo.host,
  username: config.mongo.username,
  password: config.mongo.password,
  oplog: config.mongo.oplog,
  output: config.mongo.output,
  bucket: config.aws.bucket,
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretKeyId,
  retry: config.aws.retry
})

const runBackup = () => {
  Logger.info('starting backup...')

  const options = getOptionsFromConfig(Config)
  Backup(options, (err) => {
    if (err) Logger.error(`backup error: ${err}`)
    else Logger.info('backup completed')
  })
}

module.exports = new CronJob({
  cronTime: Config.schedule,
  onTick: runBackup,
  start: Config.runOnBoot,
  timeZone: Config.timezone
})
