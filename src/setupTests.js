// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {},
    addEventListener: function() {},
    removeEventListener: function() {},
    dispatchEvent: function() {},
  };
};

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;

// Mock localStorage
const mockStorage = {
  'locale': 'vi-VN',
  'theme': JSON.stringify(false),
  'flag': JSON.stringify(false),
  'accessToken': JSON.stringify(null),
  'refreshToken': JSON.stringify(null),
  'selectedClassId': JSON.stringify(null),
  'selectedClass': JSON.stringify(null),
  'selectedClassImg': JSON.stringify(null),
  'selectedTopicId': JSON.stringify(null)
};

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(key => mockStorage[key] || null),
    setItem: jest.fn((key, value) => {
      mockStorage[key] = value;
    }),
    removeItem: jest.fn(key => {
      delete mockStorage[key];
    }),
    clear: jest.fn(() => {
      Object.keys(mockStorage).forEach(key => {
        delete mockStorage[key];
      });
    }),
    length: Object.keys(mockStorage).length,
    key: jest.fn(index => Object.keys(mockStorage)[index])
  },
  writable: true
});

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock Intersection Observer
class IntersectionObserverMock {
  constructor() {
    this.observe = jest.fn();
    this.unobserve = jest.fn();
    this.disconnect = jest.fn();
  }
}

window.IntersectionObserver = IntersectionObserverMock;

// Mock getComputedStyle
window.getComputedStyle = jest.fn(() => ({
  getPropertyValue: jest.fn(),
}));
