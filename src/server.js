
// load in fetch so we always have it ready (globals are bad, but this mimics how browsers do it)
require('isomorphic-fetch')

const Koa = require('koa') // import not used to avoid babel/transpile dependency
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// fire up our in-memory db - just for example
require('./db').init()

// import our REST APIs
const { getProduct, putProduct } = require('./products')

// setup a RESTful routes to handle incoming requests 
router.get('/products/:id', async (ctx) => {
	ctx.body = await getProduct(ctx.params.id)
})
router.put('/products/:id', async (ctx) => {

})

// register koa-router with the koa app instance
app.use(router.routes())
   .use(router.allowedMethods())

// fire up that server and bind it to a port to start taking requests
app.listen(3000)
console.log('Server listening on port 3000')
