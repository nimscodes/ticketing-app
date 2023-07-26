import request from 'supertest'
import { app } from '../../app'

it('fails when a email does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(400);
})

it('fails when an incorrect password is supplied ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

    await request(app)
      .post('/api/users/signin')
      .send({
        email: "test@test.com",
        password: "padsfdfdf"
      })
      .expect(400);
})

it('response with a cookie when given valid credentials ', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: "test@test.com",
      password: "password"
    })
    .expect(200);

  console.log(response.get('Set-Cookie'));
  expect(response.get('Set-Cookie')).toBeDefined();
})