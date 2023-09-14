const request = require('supertest');
const app = require('../server');

// Mock user data for testing
const mockUser = {
  name: 'John Doe',
  phone: '1234567890',
  password: 'password123',
};

describe('User Registration and Authentication', () => {
  let token; // JWT token for authenticated requests

  // Register a user before running the tests
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/users')
      .send(mockUser);
      
    // Store the JWT token for authenticated requests
    token = response.body.token;
  });

  // Cleanup after running the tests
  afterAll(async () => {
    // Perform any necessary cleanup, such as deleting test data from the database
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(mockUser);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(mockUser.name);
    expect(response.body.phone).toBe(mockUser.phone);
  });

  it('should authenticate a user and return a token', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ phone: mockUser.phone, password: mockUser.password });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return user profile for authenticated user', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(mockUser.name);
    expect(response.body.phone).toBe(mockUser.phone);
  });

  // Add more test cases for other user-related functionality as needed
});
