const request = require("supertest");
const app = require("../../app");
const SequelizeMock = require("sequelize-mock");
const { User } = require("../../models");

describe("test user error handling", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.ENVIRONMENT;
  });

  test("user should return error if no email and password are passed", async () => {
    const user = await request(app.callback()).post("/users");

    expect(user.status).toBe(400);
  });

  test("email should be valid", async () => {
    const user = await request(app.callback()).post("/users").send({
      email: "hello",
      password: "123",
    });

    expect(user.status).toBe(400);
  });
});

describe("test user routes", () => {
  const OLD_ENV = process.env;
  const testUser = {
    email: "testEmail@test.com",
    password: "password",
  };

  const newUser = {
    email: "newUser@test.com",
    password: "password",
  };

  beforeEach(async () => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.ENVIRONMENT;

    await User.create(testUser);
  });

  afterEach(async () => {
    await User.destroy({
      where: {
        email: testUser.email,
      },
    });
    await User.destroy({
      where: {
        email: newUser.email,
      },
    });
  });

  test("user already exists", async () => {
    const user = await request(app.callback()).post("/users").send(testUser);

    expect(user.body.error.message).toBe("User already exists");
  });

  test("successfully create new user", async () => {
    const user = await request(app.callback()).post("/users").send(newUser);
    expect(user.body.success).toBeTruthy();
  });

  test("successfully login", async () => {
    const user = await request(app.callback())
      .post("/users/login")
      .send(testUser);
    expect(user.body.token).toBeTruthy();
  });
});
