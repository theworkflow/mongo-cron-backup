const joi = require('joi')

const aws = require('./components/aws')
const mongo = require('./components/mongo')

const envVars = {
  PORT: joi.number()
    .default(8080),
  HOST: joi.string()
    .default('127.0.0.1'),
  LOG_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),
  CRON_SCHEDULE: joi.string()
    .default('0 0,12 * * *'),
  CRON_TIMEZONE: joi.string()
    .default('America/New_York'),
  RUN_ON_BOOT: joi.boolean()
    .truthy('true')
    .falsy('false')
    .default(false)
}

const schema = joi.object(envVars).unknown().required()
const { error, value: env } = joi.validate(process.env, schema)
if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  port: env.PORT,
  host: env.HOST,
  logLevel: env.LOG_LEVEL,
  schedule: env.CRON_SCHEDULE,
  timezone: env.CRON_TIMEZONE,
  runOnBoot: env.RUN_ON_BOOT
}

module.exports = Object.assign({}, aws, mongo, config)
