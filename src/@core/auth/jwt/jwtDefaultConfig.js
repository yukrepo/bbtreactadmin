// ** Auth Endpoints
export default {
  loginEndpoint: 'http://localhost:5000/users/login',
  registerEndpoint: 'http://localhost:5000/users',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: 'http://localhost:5000/users/logout',

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
