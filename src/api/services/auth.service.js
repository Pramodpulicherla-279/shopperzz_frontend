import apiClient from '../../../apiClient';

// The TypeScript interface has been removed. JSDoc is used for type hinting.
/**
 * @typedef {object} LoginResponse
 * @property {string} token
 * @property {string} message
 */

// Function to call the login API endpoint
export const loginUser = async (email, password) => {
  try {
    // The generic <LoginResponse> has been removed from the post call
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    // On success, return the response data (which includes the token)
    return response.data;
  } catch (error) {
    // If the server responds with an error (like 400), it will be caught here
    if (error.response && error.response.data && error.response.data.message) {
      // Throw an error with the specific message from the server
      throw new Error(error.response.data.message);
    } else {
      // For network errors or other issues, throw a generic message
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};