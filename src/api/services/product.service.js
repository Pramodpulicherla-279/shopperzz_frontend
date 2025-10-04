import apiClient from '../../../apiClient';

// The Product interface has been removed as it is a TypeScript feature.
// JSDoc can be used for type hinting in JavaScript if needed.
/**
 * @typedef {object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} description
 * @property {string} imageUrl
 */

// Function to fetch all products from the backend
export const getDemandedProducts = async () => {
  try {
    const response = await apiClient.get('/demanded-products');
    console.log('demanded-profv jdsbn',response.data)
    console.log('image1', response.data[0].imageUrls[0])
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    console.log('all products hhjdvs', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCartProducts = async () => {
  try {
    const response = await apiClient.get('/cart-products');
    console.log('cart products hhjdvs', response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};