const request = require('supertest');
const app = require('../../src/app');


test('should it handle no existent route  ', async () => {
    const response = await request(app)
        .post('/gfdgdfgddfg')
    expect(response.status).toEqual(404);
    
})