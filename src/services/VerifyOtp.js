import axios from "axios";
import {BASE_URL}  from './../ApiUrl';

const API_URL = `${BASE_URL}/verify-otp/`

export const verifyOtp = async (otp,value) => {
  const method = 'email';
  try {
    const response = await axios.post(API_URL, { value, method,otp });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
