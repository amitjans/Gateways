const request = require('supertest');
const app = require('../src/index');

describe('GET/api/gateway', () => {
    it('respond with json containing a list of all gateways', done => {
        request(app)
            .get('/api/gateway')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });
});

describe('GET/api/gateway/:id', () => {
    it('respond with json containing a single gateway', done => {
        request(app)
            .get('/api/gateway/6035fa5a788be24d28215be4')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });

    it('respond with json "Gateway with id 6035fa5a788be24d28215bf1 does not exists"', done => {
        request(app)
            .get('/api/gateway/6035fa5a788be24d28215bf1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });
});

describe('POST/api/gateway', () => {
    it('respond with 201 created', done => {
        request(app)
            .post('/api/gateway')
            .send({ serial_number: 'GN123456789', name: 'GTest', ipv4: '127.0.0.1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });

    it('respond with status 422, "The format for the IPv4 address is incorrect"', done => {
        request(app)
            .post('/api/gateway')
            .send({ serial_number: 'GN123456789', name: 'GTest', ipv4: '127.0.300.1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });

    it('respond with status 422, "One or more fields are empty."', done => {
        request(app)
            .post('/api/gateway')
            .send({ serial_number: 'GN123456789', name: '', ipv4: '127.0.0.1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });
});

describe('UPDATE/api/gateway/:id', () => {
    it('respond with status 200 updated', done => {
        request(app)
            .put('/api/gateway/6035fa5a788be24d28215be4')
            .send({ serial_number: 'GN987654321', name: 'GTest', ipv4: '192.168.0.1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with status 422, "The format for the IPv4 address is incorrect"', done => {
        request(app)
            .put('/api/gateway/6035fa5a788be24d28215be4')
            .send({ serial_number: 'GN987654321', name: 'GTest', ipv4: '300.168.300.1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with status 422, "One or more fields are empty.', done => {
        request(app)
            .put('/api/gateway/6035fa5a788be24d28215be4')
            .send({ serial_number: 'GN987654321', name: '', ipv4: '192.168.0.1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });
});

// describe('DELETE/api/gateway/:id', () => {
//     it('respond with json containing a list of all gateways', done => {
//         request(app)
//             .get('/api/gateway6035fa5a788be24d28215be4')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(err => {
//                 if (err) return done(err);
//                 done();
//             })
//     });
// });