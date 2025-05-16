import axios from 'axios';
import { BACKEND_URL } from '@/lib/utils';

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login/`, {
      email,
      password
    }, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    console.error('Error during login:', error);
    if (error.response && error.response.data && error.response.data.message) {
      return { message: error.response.data.message };
    }

    return { message: error.response.data.error || 'An error occurred during login' };
  }
}
