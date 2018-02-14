
const loki = require('lokijs')

const db = new loki('loki.json')

const prices = db.addCollection('prices')
module.exports.prices = prices

function init () {
	// 15117729, 16483589, 16696652, 16752456, 15643793, 13860428
	prices.insert({ id: '15117729', price: 13.49, currency_code: 'USD' })
	prices.insert({ id: '16483589', price: 13.49, currency_code: 'USD' })
	prices.insert({ id: '16696652', price: 13.49, currency_code: 'USD' })
	prices.insert({ id: '16752456', price: 13.49, currency_code: 'USD' })
	prices.insert({ id: '15643793', price: 13.49, currency_code: 'USD' })
	prices.insert({ id: '13860428', price: 13.49, currency_code: 'USD' })
}
module.exports.init = init

