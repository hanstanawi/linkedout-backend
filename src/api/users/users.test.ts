import request from 'supertest';
import app from '../../app';
import prisma from '../../db';

beforeAll(async () => {
  try {
    await prisma.user.deleteMany();
    await prisma.user.createMany({
      data: [
        {
          firstName: 'John',
          lastName: 'Doe',
          about: 'This is John Doe',
          birthDate: new Date('2022-02-02').toISOString(),
          profileImage: null,
        },
        {
          firstName: 'Jane',
          lastName: 'Doe',
          about: 'This is Jane Doe',
          birthDate: new Date('2022-02-02').toISOString(),
          profileImage: null,
        },
      ],
    });
  } catch (err) {}
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /api/v1/users', () => {
  it('responds with an array of users', async () =>
    request(app)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(2);
      }));
});

let userId = '';
describe('POST /api/v1/users', () => {
  it('responds with an error if the user is invalid', (done) => {
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        firstName: '',
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a created user', async () =>
    request(app)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        firstName: 'Kevin',
        lastName: 'Doe',
        about: 'This is Kevin Doe',
        birthDate: new Date('2022-02-02').toISOString(),
        profileImage: null,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
        expect(response.body).toHaveProperty('firstName');
        expect(response.body.firstName).toBe('Kevin');
        expect(response.body).toHaveProperty('lastName');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body).toHaveProperty('birthDate');
        expect(response.body.birthDate).toBe('2022-02-02T00:00:00.000Z');
        expect(response.body).toHaveProperty('about');
        expect(response.body.about).toBe('This is Kevin Doe');
        expect(response.body).toHaveProperty('profileImage');
        expect(response.body.profileImage).toBe(null);
        expect(response.body).toHaveProperty('workExperiences');
        expect(response.body.workExperiences).toHaveProperty('length');
        expect(response.body.workExperiences).toHaveLength(0);
      }));
});

describe('GET /api/v1/users/:id', () => {
  it('responds with a single user', async () => {
    request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBe(userId);
        expect(response.body).toHaveProperty('firstName');
        expect(response.body.firstName).toBe('Kevin');
        expect(response.body).toHaveProperty('lastName');
        expect(response.body.lastName).toBe('Doe');
        expect(response.body).toHaveProperty('birthDate');
        expect(response.body.birthDate).toBe('2022-02-02T00:00:00.000Z');
        expect(response.body).toHaveProperty('about');
        expect(response.body.about).toBe('This is Kevin Doe');
        expect(response.body).toHaveProperty('profileImage');
        expect(response.body.profileImage).toBe(null);
        expect(response.body).toHaveProperty('workExperiences');
        expect(response.body.workExperiences).toHaveProperty('length');
        expect(response.body.workExperiences).toHaveLength(0);
      });
  });

  it('responds with an invalid id error', (done) => {
    request(app)
      .get('/api/v1/users/q2312sadasd')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/v1/users/4fb16688-dba0-4499-b824-2d18cf57f242')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('PUT /api/v1/users', () => {
  it('responds with an invalid id error', (done) => {
    request(app)
      .put('/api/v1/users/q2312sadasd')
      .set('Accept', 'application/json')
      .send({
        firstName: 'Kevin',
        lastName: 'DoeUpdated',
        about: 'This is Kevin Doe biography',
        birthDate: new Date('2022-02-02').toISOString(),
        profileImage: null,
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/users/4fb16688-dba0-4499-b824-2d18cf57f242')
      .set('Accept', 'application/json')
      .send({
        firstName: 'Kevin',
        lastName: 'DoeUpdated',
        about: 'This is Kevin Doe biography',
        birthDate: new Date('2022-02-02').toISOString(),
        profileImage: null,
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('responds with an updated user', async () =>
    request(app)
      .put(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .send({
        firstName: 'Kevin',
        lastName: 'DoeUpdated',
        about: 'This is Kevin Doe biography',
        birthDate: new Date('2022-02-02').toISOString(),
        profileImage: null,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('lastName');
        expect(response.body.lastName).toBe('DoeUpdated');
        expect(response.body).toHaveProperty('about');
        expect(response.body.about).toBe('This is Kevin Doe biography');
      }));
});

describe('DELETE /api/v1/users/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/users/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/users/4fb16688-dba0-4499-b824-2d18cf57f242')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('responds with a 204 status code', (done) => {
    request(app).delete(`/api/v1/users/${userId}`).expect(204, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/users/${userId}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});
