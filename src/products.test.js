
const fetchMock = require('fetch-mock');
const { getProduct, putProduct } = require('./products')

const db = require('./db')
db.init()

describe('products', () => { // make a simple name to make grep'ing the tests for isolated runs super easy later

	beforeAll( () => { // this is a unit test, not an integration test, so mock out the response
		fetchMock.get('*', require('./__mockdata__/product-sample.json'))
	})

	afterAll( () => {
		fetchMock.restore() // teardown our mock so we don't leak
	})

	it('should GET product info from redsky', async () => {
		const product = await getProduct('13860428')
		expect(product.id).toEqual('13860428')
		expect(product.name).toEqual('The Big Lebowski (Blu-ray)') // make sure we get the name back in a decent format
		expect(product.current_price.value).toEqual(13.49)
		expect(product.current_price.currency_code).toEqual('USD')
	})

	it('should PUT product pricing data', async () => {
		await putProduct({ id: '13860428', current_price: { value: 98.76, currency_code: 'USD' } })
		const product = await getProduct('13860428')
		expect(product.current_price.value).toEqual(98.76)
		expect(product.current_price.currency_code).toEqual('USD')
	})

	// add some more non-happy path tests here...
})