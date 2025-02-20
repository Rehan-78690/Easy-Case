import axios from "axios";
const API_URL = 'http://127.0.0.1:8000/verify-otp/'
export const verifyOtp = async (otp,value) => {
  const method = 'email';
  try {
    const response = await axios.post(API_URL, { value, method,otp });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
