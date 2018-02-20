
const supertest = require('supertest')
const server = require('./server')

describe('server', () => {

	let request;

	beforeAll( () => {
		request = supertest(server)
	})

	afterAll( () => {
		server.close()
	})

	it('should handle a GET request', async () => {
		await request.get('/healthcheck').expect(200)
	})

	it('should GET a product if requested', async () => {
		await request.get('/products/15117729').expect(200)
		
	})

	it('should PUT a product if passed', async () => {
		await request.put('/products/15117729')
			.set('Accept', 'application/json')
			.send({current_price: {value: 88.88, currency_code: 'USD'}})
			.expect(200)
		
	})

})