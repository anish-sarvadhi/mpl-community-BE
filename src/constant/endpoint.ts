export enum END_POINT {

  // Base API Route
  API_BASE = "/api/v1",
  API_BASE_USER = "/api/v1/user",

  // Common Routes
  ID = "/:id",
  SEARCH = "/search",
  UPDATE = "/update",
  DELETE = "/delete",
  FETCH = "/fetch",
  BLANK = "/",

  // Security Routes
  ENCRYPT = "/encrypt",
  DECRYPT = "/decrypt",
  SECURITY = "/security",

  // Authentication Routes
  AUTH = "/auth",
  USER = "/user",
  SIGNUP = "/signup",
  LOGIN = "/login",
  REGISTER = "/register",
  VERIFY_JWT = "/verify-token",
  FORGOT_PASSWORD = "/forgot-password",
  GET_USER = "/list",

}