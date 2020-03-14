const request = require("supertest");
const app = require("./../src/app");
const User = require("./../src/models/user");
const {user1Id, user1, setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test("should signup a user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "harshal",
      email: "harshal@example.com",
      password: "pass2344!!"
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();
  //console.log(user)

  expect(response.body).toMatchObject({
    user: {
      name: "harshal",
      email: "harshal@example.com"
    },
    token: user.tokens[0].token
  });

  expect(user.password).not.toBe("pass2344!!");
});

test("Should log in existing user", async () => {
  response = await request(app)
    .post("/users/login")
    .send({
      email: user1.email,
      password: user1.password
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(user.tokens[1].token).toBe(response.body.token);
});

test("Should not login non existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "akjdasd;aksd@wewer.com",
      password: "asdasdasdas"
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
});

test("Should delete account for authorized user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${user1.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(response.body._id);
  expect(user).toBeNull();
});

test("Should not delete account for unauthorized user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401);
});

test("Should upload avatar image", async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(user1Id)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test("Should update valid upload field", async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            email: 'exampel@example.com'
        })
        .expect(200)
    
    const user = await User.findById(user1Id);
    expect(user.email).toEqual('exampel@example.com')
})

test("Should not update invalid fields", async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${user1.tokens[0].token}`)
        .send({
            location: 'exampel@example.com'
        })
        .expect(400)
})