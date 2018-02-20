
const _ = require('lodash')
const db = require('./db')

/**
 * Will return product information if passed a unique product identifier. This service combines product and price information into a single api. 
 * @param {string} id 
 */
async function getProduct (id) { // the space between the function name and the paranthesis is to make this function super easy to search for later

	// fetch product info
	const redskyUrl = `https://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics` // normally we don't hardcode things, we should put this into a config variable that can be updated without deploy
	const response = await fetch(redskyUrl) // this is missing error handling
	const productDocument = await response.json()

	// fetch price info
	const priceDocument = db.prices.findOne({ 'id': id })

	// {"id":13860428,"name":"The Big Lebowski (Blu-ray) (Widescreen)","current_price":{"value": 13.49,"currency_code":"USD"}}
	const result = {
		id,
		name: _.get(productDocument, 'product.item.product_description.title'),
		current_price: {
			value: priceDocument.price,
			currency_code: priceDocument.currency_code
		}
	}

	// return result
	return result
}

async function putProduct (product) {

	// update the price of the document
	db.prices.findAndUpdate( { id: product.id }, (productItem) => {
		productItem.id = product.id
		productItem.price = product.current_price.value
		productItem.currency_code = product.current_price.currency_code
	}) 

}

module.exports = {
	getProduct,
	putProduct
}