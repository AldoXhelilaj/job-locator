module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // Mock CSS imports
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel to transpile JSX
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};