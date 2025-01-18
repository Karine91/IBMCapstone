export const useUserData = {
  logout: jest.fn(),
  saveToken: jest.fn(),
  setProfile: jest.fn(),
  token: "token",
  user: {
    email: "test@test.com",
    name: "Test",
    role: "patient",
    phone: "12345678",
  },
  isLoggedIn: true,
};
