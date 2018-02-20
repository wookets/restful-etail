
const db = require('./db')

describe('db', () => { 

	it('should init properly', () => {
		expect(db.prices.count()).toEqual(0)
		db.init()
		expect(db.prices.count()).toBeGreaterThan(0)
	})

})
