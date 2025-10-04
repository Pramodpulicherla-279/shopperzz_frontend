import axios from 'axios';

// ====================================================================
// IMPORTANT: You MUST replace this with your actual backend server URL
// ====================================================================
//
// -> If you are running the app on an ANDROID EMULATOR, the URL is usually:
//    http://10.0.2.2:PORT/api/v1
//
// -> If you are running the app on a PHYSICAL DEVICE, you must use your
//    computer's local IP address on the Wi-Fi network.
//    Find it by running `ipconfig` (Windows) or `ifconfig` (Mac/Linux).
//    The URL will look like: http://192.168.1.5:PORT/api/v1
//
const API_BASE_URL = 'http://192.168.0.123:8080/api/v1'; // Replace this!

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;

