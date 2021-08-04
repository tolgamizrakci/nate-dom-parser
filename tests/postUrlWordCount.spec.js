const request = require('supertest');
const app = require('../server/index');
const responseMock = require('./response.json');

/*
  Black-box unit test to verify the base case
*/
test('POST Retrieve URL DOM word count', async () => {
    await request(app)
        .post('/api')
        .send({
            url: 'http://www.paulgraham.com/index.html',
        })
        .expect(200, responseMock);
});
