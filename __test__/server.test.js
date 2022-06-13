'use strict';
const { app } = require('../src/server');  
const supertest = require('supertest');
const mockRequest = supertest(app);


const { db } = require('../src/models/index');
// before any of the test create a connection
beforeAll(async () => {
    await db.sync();
});

describe('Web server', () => {
    // Check if 404 is handled 

    it('Should respond with 404 status on an invalid route', async () => {
        const response = await mockRequest.get('/use');
        expect(response.status).toBe(404);
    });
// test if can create a newuser
it('can create a new user', async () => {
    const response = await mockRequest.post('/signup').send({
        username: 'heba',
        password: '123'
    });
    expect(response.status).toBe(201);
});
it('bad method', async () => {
    const response = await mockRequest.get('/signin');
    expect(response.status).toBe(404);
});
// test if can login
it('can signin to login as a user (use basic auth)', async () => {
    const response = await mockRequest.post('/signin').auth('heba','123');
    expect(response.status).toBe(200);

});
it('Sign in with wrong password', async () => {
    const response = await mockRequest.post('/signin').auth('heba','1');
    expect(response.status).toBe(500);

});
it('Sign in with wrong username', async () => {
    const response = await mockRequest.post('/signin').auth('heb','123');
    expect(response.status).toBe(500);

});


});



// after all the tests are done
afterAll(async () => {
    await db.drop();
});