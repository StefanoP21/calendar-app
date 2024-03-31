export const initialState = {
  status: 'checking',
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: 'authenticated',
  user: {
    name: 'Test User',
    uid: 'abc-123',
  },
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined,
};
