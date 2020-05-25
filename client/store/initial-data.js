const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "content of task1" },
    "task-2": { id: "task-2", content: "content of task2" },
    "task-3": { id: "task-3", content: "content of task3" },
    "task-4": { id: "task-4", content: "content of task4" },
    "task-5": { id: "task-5", content: "content of task5" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Small Size",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"]
    }
  },
  columnOrder: ["column-1"]
}

export default initialData;
