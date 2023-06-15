import create, { SetState } from "zustand";

type Task = {
  id: number;
  title: string;
};

type TaskManagerState = {
  tasks: Task[];
  searchTask: string;
  setSearchTask: (query: string) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Partial<Task>) => void;
  deleteTask: (taskId: number) => void;
};

const useTaskManager = create<TaskManagerState>((set: SetState<TaskManagerState>) => ({
  tasks: [],
  searchTask: "",
  setSearchTask: (query: string) => set(() => ({ searchTask: query })),
  addTask: (task: Task) =>
    set((state: TaskManagerState) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId: number, updatedTask: Partial<Task>) =>
    set((state: TaskManagerState) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (taskId: number) =>
    set((state: TaskManagerState) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
}));

export default useTaskManager;