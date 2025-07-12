import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memoApi } from '../api/memo.api';
import {
  CreateMemoDto,
  UpdateMemoDto,
  GetMemoFilterDto,
  Memo,
} from '../model/memo.model';

export const useCreateOrUpdateMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMemoDto) => memoApi.createOrUpdateMemo(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
      queryClient.invalidateQueries({ queryKey: ['memoByDate'] });
    },
  });
};

export const useGetMemoByDate = (date: string) => {
  return useQuery<Memo>({
    queryKey: ['memoByDate', date],
    queryFn: () => memoApi.getMemoByDate(date),
    enabled: !!date,
  });
};

export const useGetAllMemos = (filterDto: GetMemoFilterDto) => {
  return useQuery<Memo[]>({
    queryKey: ['memos', filterDto],
    queryFn: () => memoApi.getAllMemos(filterDto),
  });
};

export const useUpdateMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateMemoDto }) =>
      memoApi.updateMemo(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
      queryClient.invalidateQueries({ queryKey: ['memoByDate'] });
    },
  });
};

export const useDeleteMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => memoApi.deleteMemo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
      queryClient.invalidateQueries({ queryKey: ['memoByDate'] });
    },
  });
};
