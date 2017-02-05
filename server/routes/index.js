const KnockKnock = require('knock-knock')

const ping = (request, reply) => KnockKnock(reply)

module.exports = [
  { method: 'GET', path: '/ping', handler: ping }
]
