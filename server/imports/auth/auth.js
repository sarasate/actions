export const isAuthenticated = user => {
  if (!user) throw new Error('Authentication failed!');
  return user;
};
