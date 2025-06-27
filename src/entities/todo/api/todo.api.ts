import { axios } from '@/app/config';

export const postTodo = async (params) => {
  const { data } = await axios.post('/todo', params);
  return data;
};

export const getTodoList = async () => {
  const { data } = await axios.get('/todo/all');
  return data;
};

export const getTodoByDate = async (date: string) => {
  const { data } = await axios.get('/todo/date', {
    params: { date },
  });
  return data;
};

export const getTodoExists = async (date: string) => {
  const { data } = await axios.get('/todo/exists', {
    params: { date },
  });
  return data as { exists: boolean };
};
