const supertest = require("supertest");

const app = require("../../server");
const { initTestServer, stopTestServer } = require("../../utils/tests/server");
const { seedUsers } = require("../../db/seed");
const { mockUserClaims } = require("../../utils/tests/mock-data");

jest.mock("../../utils/auth/verifyIdToken", () => {
  return jest.fn().mockImplementation(() => {
    return Promise.resolve(mockUserClaims);
  });
});

const request = supertest(app);

describe("user routes", () => {
  beforeAll(async () => await initTestServer());
  afterAll(async () => await stopTestServer());
  beforeEach(async () => await seedUsers());

  test("POST /sign-up returns 401 without a Bearer token", async () => {
    const res = await request
      .post("/sign-up")
      .set("Authorization", "some token");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      data: null,
      error: expect.stringMatching(/unauthorized/i),
    });
  });

  test("POST /sign-up returns 401 without an authorization header", async () => {
    const res = await request.post("/sign-up");

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      data: null,
      error: expect.stringMatching(/unauthorized/i),
    });
  });

  test("POST /sign-up creates the user", async () => {
    const res = await request
      .post("/sign-up")
      .set("Authorization", "Bearer random_test_uid")
      .send({
        uid: mockUserClaims.uid,
        email: mockUserClaims.email,
      });

    expect(res.status).toBe(201);
  });

  test("GET /users returns the users info", async () => {
    const res = await request
      .get("/users")
      .set("Authorization", "Bearer random_test_uid");

    expect(res.status).toBe(200);

    expect(res.body).toEqual({
      data: expect.arrayContaining([
        {
          _id: expect.anything(),
          firstName: expect.anything(),
          lastName: expect.anything(),
          email: expect.anything(),
        },
      ]),
      error: null,
    });
  });

  test("GET /users returns a 401 without authorization", async () => {
    const res = await request.get("/users");

    expect(res.status).toBe(401);

    expect(res.body).toEqual({
      data: null,
      error: expect.stringMatching(/unauthorized/i),
    });
  });
});
