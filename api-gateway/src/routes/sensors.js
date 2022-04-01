'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/sensors', async function (request, reply) {
    const sensors = await fastify.knex('sensors').select()
    if(!sensors || !sensors.length){
      reply.code(404).send(`No sensors found.`)
    }else{
      reply.send(sensors)
    }
  })

  fastify.get('/sensors/:id', async function (request, reply) {
    const id = request.params.id
    if(!id){
      reply.redirect('/sensors')
    }
    
    const sensor = await fastify.knex('sensors').select().where({id: id}).first()
    if(!sensor){
      reply.code(404).send(`Sensor ${id} is not found.`)
    }else{
      reply.send(sensor)
    }
  })

  fastify.get('/sensors/:id/related', async function (request, reply) {
    const id = request.params.id
    
    const sensors = await fastify.knex('related').select("related_id").where({sensor_id: id})
    if(!sensors || !sensors.length){
      reply.code(404).send(`No related sensors found.`)
    }else{
      reply.send(sensors.map(a => a.related_id))
    }
  })
}