import axios from 'axios';
import { fetchUsers } from 'src/services/userService';

export const fetchUsers = async () => {
  const response = await axios.get('/api/users');
  return response.data;
};
