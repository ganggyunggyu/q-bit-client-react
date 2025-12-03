import { Todo } from '../model/todo.model';

export interface TodoStats {
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
}

export const calculateTodoStats = (todos: Todo[]): TodoStats => {
  let totalTodos = 0;
  let completedTodos = 0;

  todos.forEach((todoEntry) => {
    todoEntry.todos.forEach((todoItem) => {
      totalTodos++;
      if (todoItem.isCompleted) {
        completedTodos++;
      }
    });
  });

  const completionRate =
    totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100;

  return {
    totalTodos,
    completedTodos,
    completionRate: parseFloat(completionRate.toFixed(2)),
  };
};
