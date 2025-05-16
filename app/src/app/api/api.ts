import axios from 'axios';
import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { BACKEND_URL } from '@/lib/utils';

export async function apiRequest(
  req: NextApiRequest,
  res: NextApiResponse,
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
) {
  const token = getCookie('nestsiteAuthToken', { req, res }) as string;

  if (!token) {
    return { status: 401, message: 'Unauthorized' };
  }

  try {
    const response = await axios({
      method,
      url: `${BACKEND_URL}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data,
      withCredentials: true,
    });
    return { status: response.status, data: response.data };
  } catch (error: any) {
    console.error(`Error during ${method} request to ${endpoint}:`, error);
    
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'An error occurred';
    
    return { status, message };
  }
}
