
// load in fetch so we always have it ready (globals are bad, but this mimics how browsers do it)
require('isomorphic-fetch')

const Koa = require('koa') // import not used to avoid babel/transpile dependency
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
app.use(bodyParser())
const PORT = process.env.PORT || 3000;
const router = new Router()

// fire up our in-memory db - just for example
require('./db').init()

// import our REST APIs
const { getProduct, putProduct } = require('./products')

// setup a RESTful routes to handle incoming requests 
router.get('/healthcheck', async (ctx) => {
	ctx.body = { status: 'GOOD!' }
})
router.get('/products/:id', async (ctx) => {
	ctx.body = await getProduct(ctx.params.id)
})
router.put('/products/:id', async (ctx) => {
	const product = {
		id: ctx.params.id,
		current_price: {
			value: ctx.request.body.current_price.value,
			currency_code: ctx.request.body.current_price.currency_code
		}
	}
	await putProduct(product)
	ctx.status = 200
})

// register koa-router with the koa app instance
app.use(router.routes())

// fire up that server and bind it to a port to start taking requests
const server = app.listen(PORT)
console.log(`Server listening on port ${PORT}`)
module.exports = server

