const User = {
  id: 1,
  username: 'user',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

const loginInvalidEmail = {
  email: 'user',
  password: 'user123',
}

const loginInvalidPassword = {
  email: 'user@user.com',
  password: 'use',
}

const loginNotEmail = {
  emai: 'user@user.com',
  password: 'user123',
}

const loginNotPassword = {
  email: 'user@user.com',
  passwor: 'user123',
}

const messageInvalid = { message: 'Invalid email or password' }

const messageNot = { message: 'All fields must be filled' }

export { 
  User,
  loginInvalidEmail,
  loginInvalidPassword,
  loginNotEmail,
  loginNotPassword,
  messageInvalid,
  messageNot,
}
