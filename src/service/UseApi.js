// Import axios library for making HTTP requests
import axios from 'axios';

// Import BASE_URL from the configuration file
import BASE_URL from '../config/config';

// Asynchronous function to make an API request
export const makeRequest = async (method, dataid = '', data = null) => {
  try {

    // Use axios to make an HTTP request with the specified method, URL, and data
    const response = await axios({
      method,
      url: `${BASE_URL}${dataid}`, // Combine BASE_URL and dataid to form the complete URL
      data,
    });

    // Return the response data
    return response;
  } catch (error) {
    
    // Log and re-throw the error for handling in Redux or components
    console.error('Error making API request:', error);
    throw error;
  }
};
