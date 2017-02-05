const joi = require('joi')

const envVars = {
  AWS_S3_ACCESS_KEY: joi.string().required(),
  AWS_S3_SECRET_KEY: joi.string().required(),
  AWS_S3_BUCKET: joi.string().required(),
  AWS_S3_RETRY: joi.number()
    .default(3)
}

const schema = joi.object(envVars).unknown().required()
const { error, value: env } = joi.validate(process.env, schema)
if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  aws: {
    accessKeyId: env.AWS_S3_ACCESS_KEY,
    secretKeyId: env.AWS_S3_SECRET_KEY,
    bucket: env.AWS_S3_BUCKET,
    retry: env.AWS_S3_RETRY
  }
}

module.exports = config
