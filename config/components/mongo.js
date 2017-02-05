const joi = require('joi')

const envVars = {
  MONGO_HOST: joi.string().required(),
  MONGO_USERNAME: joi.string().required(),
  MONGO_PASSWORD: joi.string().required(),
  MONGO_OPLOG: joi.boolean()
    .truthy('true')
    .falsy('false')
    .default(false),
  MONGO_OUTPUT_DIR: joi.string().required()
}

const schema = joi.object(envVars).unknown().required()
const { error, value: env } = joi.validate(process.env, schema)
if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  mongo: {
    host: env.MONGO_HOST,
    username: env.MONGO_USERNAME,
    password: env.MONGO_PASSWORD,
    oplog: env.MONGO_OPLOG,
    output: env.MONGO_OUTPUT_DIR
  }
}

module.exports = config
