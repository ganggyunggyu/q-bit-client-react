import { axios } from '@/app/config';

interface CreateMemoDto {
  // ...
}

interface UpdateMemoDto {
  // ...
}

interface GetMemoFilterDto {
  // ...
}

export const memoApi = {
  createOrUpdateMemo: async (dto: CreateMemoDto) => {
    const response = await axios.post('/memo', dto);
    return response.data;
  },

  getMemoByDate: async (date: string) => {
    const response = await axios.get('/memo/date', { params: { date } });
    return response.data;
  },

  getAllMemos: async (filterDto: GetMemoFilterDto) => {
    const response = await axios.get('/memo', { params: filterDto });
    return response.data;
  },

  updateMemo: async (id: string, dto: UpdateMemoDto) => {
    const response = await axios.patch(`/memo/${id}`, dto);
    return response.data;
  },

  deleteMemo: async (id: string) => {
    const response = await axios.delete(`/memo/${id}`);
    return response.data;
  },
};
