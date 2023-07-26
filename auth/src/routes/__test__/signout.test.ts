import { app } from "../../app";
import request from 'supertest'

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: "test@test.com",
      password: "passord"
    })
    .expect(201)

    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200);

      console.log(response.get('Set-Cookie'));
})