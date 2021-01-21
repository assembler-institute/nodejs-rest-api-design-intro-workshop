const verifyIdToken = require("../../utils/auth/verifyIdToken");
const { authMiddleware } = require("../auth-middleware");
const { mockUserClaims } = require("../../utils/tests/mock-data");

jest.mock("../../utils/auth/verifyIdToken");

describe("auth-middleware", () => {
  it("returns 401 when called without an authorization header", async () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockImplementation(function mockStatusCB() {
        return this;
      }),
      send: jest.fn(),
    };
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
    expect(res.status().send).toHaveBeenCalledWith({
      data: null,
      error: expect.stringMatching(/unauthorized/i),
    });
  });

  it("returns 401 when called without a valid bearer token", async () => {
    const req = {
      headers: {
        authorization: "test",
      },
    };
    const res = {
      status: jest.fn().mockImplementation(function mockStatusCB() {
        return this;
      }),
      send: jest.fn(),
    };
    const next = jest.fn();

    await authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith({
      data: null,
      error: expect.stringMatching(/unauthorized/i),
    });
  });

  it("calls validateIdToken with the authorization header", async () => {
    const authorizationHeader = "test_auth_header";

    const req = {
      headers: {
        authorization: `Bearer ${authorizationHeader}`,
      },
    };
    const res = {
      status: jest.fn().mockImplementation(function mockStatusCB() {
        return this;
      }),
      send: jest.fn(),
    };
    const next = jest.fn();

    verifyIdToken.mockImplementation(() => Promise.resolve(mockUserClaims));

    await authMiddleware(req, res, next);

    expect(verifyIdToken).toHaveBeenCalledWith(authorizationHeader);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("sets the user claims on the req object", async () => {
    const authorizationHeader = "test_auth_header";

    const req = {
      headers: {
        authorization: `Bearer ${authorizationHeader}`,
      },
    };
    const res = {
      status: jest.fn().mockImplementation(function mockStatusCB() {
        return this;
      }),
      send: jest.fn(),
    };
    const next = jest.fn();

    verifyIdToken.mockImplementation(() => Promise.resolve(mockUserClaims));

    await authMiddleware(req, res, next);

    expect(req.user).toEqual({
      email: mockUserClaims.email,
      uid: mockUserClaims.uid,
    });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("calls next(error) when an error triggers", async () => {
    const authorizationHeader = "test_auth_header";

    const req = {
      headers: {
        authorization: `Bearer ${authorizationHeader}`,
      },
    };
    const res = {
      status: jest.fn().mockImplementation(function mockStatusCB() {
        return this;
      }),
      send: jest.fn(),
    };
    const next = jest.fn();

    verifyIdToken.mockImplementation(() => Promise.reject(new Error("bye")));

    await authMiddleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});
