const request = require('supertest');
const app = require('../src/index');

describe('GET/api/peripheral', () => {
    it('respond with json containing a list of all peripherals', done => {
        request(app)
            .get('/api/peripheral')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });
});

describe('GET/api/peripheral/:id', () => {
    it('respond with json containing a single peripheral', done => {
        request(app)
            .get('/api/peripheral/60360bd1de5c8d481c6d2829')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });

    it('respond with json "peripheral with id 6035fa5a788be24d28215bf1 does not exists"', done => {
        request(app)
            .get('/api/peripheral/6035fa5a788be24d28215bf1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });
});

describe('POST/api/peripheral', () => {
    it('respond with 201 created', done => {
        request(app)
            .post('/api/peripheral')
            .send({ uid: 123, vendor: 'ASUSS', status: true, gateway: '6035fa5a788be24d28215be4' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });

    it('respond with status 422, "One or more fields are empty."', done => {
        request(app)
            .post('/api/peripheral')
            .send({ uid: 123, vendor: '', status: true, gateway: '6035fa5a788be24d28215be4' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });

    it('respond with status 422, "The value of the UID field must be a number."', done => {
        request(app)
            .post('/api/peripheral')
            .send({ uid: 'test', vendor: 'EASEUS', status: true, gateway: '6035fa5a788be24d28215be4' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            })
    });
});

describe('UPDATE/api/peripheral/:id', () => {
    it('respond with status 200 updated', done => {
        request(app)
            .put('/api/peripheral/6035fa8e788be24d28215be5')
            .send({ uid: 123, vendor: 'DEELL', status: true, gateway: '6035fa5a788be24d28215be4' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with status 422, "One or more fields are empty.', done => {
        request(app)
            .put('/api/peripheral/6035fa8e788be24d28215be5')
            .send({ uid: 231, vendor: '', status: true, gateway: '6035fa5a788be24d28215be4' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with status 422, "The value of the UID field must be a number.', done => {
        request(app)
            .put('/api/peripheral/6035fa8e788be24d28215be5')
            .send({ uid: 'test', vendor: 'EASEUS', status: true, gateway: '6035fa5a788be24d28215be4' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422)
            .end(err => {
                if (err) return done(err);
                done();
            });
    });
});

// describe('DELETE/api/peripheral/:id', () => {
//     it('respond with json containing a list of all peripherals', done => {
//         request(app)
//             .get('/api/peripheral6035fa5a788be24d28215be4')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(err => {
//                 if (err) return done(err);
//                 done();
//             })
//     });
// });