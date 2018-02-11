const QueryController = require('../../controllers/queryController')
const Query = require('../../models/query')
const getConnection = require('../../db')
const MockedResponse = require('../helpers/mockedResponse')
const MockedRequest = require('../helpers/mockedRequest')

const expect = require('chai').expect

describe('queryController', () => {
	let db, res, req
	const queryController = new QueryController()
	before(done => {
		db = getConnection()
		done()
	})
	beforeEach(() => {
		res = new MockedResponse()
		req = new MockedRequest()
		db.dropDatabase((err) => {
			if (err) throw err
			db.useDb('test')
		})
	})
	after(done => db.close(done))
	describe('index', done => {
		it('should return empty array when database was empty with status 200.', async () => {
			await queryController.index(req, res)
			expect(res._json).to.be.deep.equal({
				errors: [],
				values: [],
				total_query: 0
			})
			expect(res.statusCode).to.be.equal(200)
		})
		it('should return all query in array with status 200', async () => {
			const totalQuery = 2
			await Query.create({ name: 'John Doe', num: 20 })
			await Query.create({ name: 'Jane Doe', jokeId: 13 })
			await queryController.index(req, res)
			expect(res._json).to.include({
				values: [
					{ name: 'John Doe', num: 20 },
					{ name: 'Jane Doe', jokeId: 13 },
				],
				total_query: totalQuery 
			})
			expect(res.statusCode).to.equal(200)
		})
	})
	describe('create', () => {})
	describe('read', () => {})
	describe('update', () => {})
	describe('delete', () => {})
})
