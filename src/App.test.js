import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
}));

// Mock các environment variables
beforeAll(() => {
  process.env.REACT_APP_DOMAIN_API = 'http://localhost:8000';
  process.env.REACT_APP_GOOGLE_CLIENT_ID = 'test-client-id';
});

afterEach(() => {
  jest.clearAllMocks();
});

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});
