import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { memoApi } from '../api/memo.api';
import { CreateMemoDto, UpdateMemoDto, GetMemoFilterDto, Memo } from '../model/memo.model';

// 메모 생성 또는 업데이트 훅
export const useCreateOrUpdateMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateMemoDto) => memoApi.createOrUpdateMemo(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] }); // 모든 메모 갱신
      queryClient.invalidateQueries({ queryKey: ['memoByDate'] }); // 날짜별 메모 갱신
    },
  });
};

// 특정 날짜의 메모 조회 훅
export const useGetMemoByDate = (date: string) => {
  return useQuery<Memo>({
    queryKey: ['memoByDate', date],
    queryFn: () => memoApi.getMemoByDate(date),
    enabled: !!date,
  });
};

// 모든 메모 조회 훅 (필터링 가능)
export const useGetAllMemos = (filterDto: GetMemoFilterDto) => {
  return useQuery<Memo[]>({
    queryKey: ['memos', filterDto],
    queryFn: () => memoApi.getAllMemos(filterDto),
  });
};

// 메모 업데이트 훅
export const useUpdateMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateMemoDto }) => memoApi.updateMemo(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
      queryClient.invalidateQueries({ queryKey: ['memoByDate'] });
    },
  });
};

// 메모 삭제 훅
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
