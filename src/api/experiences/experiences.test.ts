import request from 'supertest';
import app from '../../app';
import prisma from '../../db';

let userId = '';
beforeAll(async () => {
  try {
    await prisma.workExperience.deleteMany();
    await prisma.user.deleteMany();

    const user = await prisma.user.create({
      data: {
        firstName: 'Kevin',
        lastName: 'Doe',
        about: 'This is Kevin Doe',
        birthDate: new Date('2022-02-02').toISOString(),
        profileImage: null,
      },
    });
    userId = user.id;
  } catch (err) {}
});

afterAll(async () => {
  await prisma.$disconnect();
});

let experienceId = '';
describe('POST /api/v1/experiences', () => {
  it('responds with an error if the experience is invalid', (done) => {
    request(app)
      .post('/api/v1/experiences')
      .set('Accept', 'application/json')
      .send({
        jobTitle: '',
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a created experience', async () =>
    request(app)
      .post('/api/v1/experiences')
      .set('Accept', 'application/json')
      .send({
        jobTitle: 'Software Engineer',
        jobDescription: null,
        companyName: 'Google',
        companyLogo: null,
        startDate: '2021-11-15',
        endDate: null,
        isCurrent: true,
        userId: userId,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        experienceId = response.body.id;
        expect(response.body).toHaveProperty('jobTitle');
        expect(response.body.jobTitle).toBe('Software Engineer');
        expect(response.body).toHaveProperty('jobDescription');
        expect(response.body.jobDescription).toBe(null);
        expect(response.body).toHaveProperty('companyName');
        expect(response.body.companyName).toBe('Google');
        expect(response.body).toHaveProperty('startDate');
        expect(response.body.startDate).toBe('2021-11-15T00:00:00.000Z');
        expect(response.body).toHaveProperty('endDate');
        expect(response.body.endDate).toBe(null);
        expect(response.body).toHaveProperty('isCurrent');
        expect(response.body.isCurrent).toBe(true);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.userId).toBe(userId);
        expect(response.body).toHaveProperty('companyLogo');
        expect(response.body.companyLogo).toBe(null);
      }));
});

describe('GET /api/v1/experiences/:id', () => {
  it('responds with a single experience', async () => {
    request(app)
      .get(`/api/v1/experiences/${experienceId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('jobTitle');
        expect(response.body.jobTitle).toBe('Software Engineer');
        expect(response.body).toHaveProperty('jobDescription');
        expect(response.body.jobDescription).toBe(null);
        expect(response.body).toHaveProperty('companyName');
        expect(response.body.companyName).toBe('Google');
        expect(response.body).toHaveProperty('startDate');
        expect(response.body.startDate).toBe('2021-11-15T00:00:00.000Z');
        expect(response.body).toHaveProperty('endDate');
        expect(response.body.endDate).toBe(null);
        expect(response.body).toHaveProperty('isCurrent');
        expect(response.body.isCurrent).toBe(true);
        expect(response.body).toHaveProperty('userId');
        expect(response.body.userId).toBe(userId);
        expect(response.body).toHaveProperty('companyLogo');
        expect(response.body.companyLogo).toBe(null);
      });
  });

  it('responds with an invalid id error', (done) => {
    request(app)
      .get('/api/v1/experiences/q2312sadasd')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .get('/api/v1/experiences/4fb16688-dba0-4499-b824-2d18cf57f242')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('PUT /api/v1/experiences', () => {
  it('responds with an invalid id error', (done) => {
    request(app)
      .put('/api/v1/experiences/q2312sadasd')
      .set('Accept', 'application/json')
      .send({
        jobTitle: 'Software Engineer',
        jobDescription: 'Write code',
        companyName: 'Google',
        companyLogo: null,
        startDate: '2021-11-15',
        endDate: null,
        isCurrent: true,
        userId: userId,
      })
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .put('/api/v1/experiences/4fb16688-dba0-4499-b824-2d18cf57f242')
      .set('Accept', 'application/json')
      .send({
        jobTitle: 'Software Engineer',
        jobDescription: 'Write Code',
        companyName: 'Google',
        companyLogo: null,
        startDate: '2021-11-15',
        endDate: null,
        isCurrent: true,
        userId: userId,
      })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('responds with an updated experience', async () =>
    request(app)
      .put(`/api/v1/experiences/${experienceId}`)
      .set('Accept', 'application/json')
      .send({
        jobTitle: 'Software Engineer',
        jobDescription: 'Write Code',
        companyName: 'Google',
        companyLogo: null,
        startDate: '2021-11-15',
        endDate: '2022-11-15',
        isCurrent: false,
        userId: userId,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('jobDescription');
        expect(response.body.jobDescription).toBe('Write Code');
        expect(response.body).toHaveProperty('endDate');
        expect(response.body.endDate).toBe('2022-11-15T00:00:00.000Z');
        expect(response.body).toHaveProperty('isCurrent');
        expect(response.body.isCurrent).toBe(false);
      }));
});

describe('DELETE /api/v1/experiences/:id', () => {
  it('responds with an invalid id error', (done) => {
    request(app)
      .delete('/api/v1/experiences/adsfadsfasdfasdf')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/experiences/4fb16688-dba0-4499-b824-2d18cf57f242')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('responds with a 204 status code', (done) => {
    request(app)
      .delete(`/api/v1/experiences/${experienceId}`)
      .expect(204, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/experiences/${experienceId}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});
