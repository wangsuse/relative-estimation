const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "example task1" },
    "task-2": { id: "task-2", content: "example task2" },
    "task-3": { id: "task-3", content: "example task3" },
    "task-4": { id: "task-4", content: "example task4" },
    "task-5": { id: "task-5", content: "example task5" },
    "task-6": { id: "task-6", content: "example task6" },
    "task-7": { id: "task-7", content: "example task7" },
    "task-8": { id: "task-8", content: "example task8" },
    "task-9": { id: "task-9", content: "example task9" },
    "task-10": { id: "task-10", content: "example task10" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Size: Small",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5","task-6", "task-7", "task-8", "task-9", "task-10"]
    },
    "dummy-0": {
      id: "dummy-0",
      title: "",
      taskIds: [],
      type: "dummy"
    },
    "column-2": {
      id: "column-2",
      title: "Size: Middle",
      taskIds: []
    },
    "dummy-1": {
      id: "dummy-1",
      title: "",
      taskIds: [],
      type: "dummy"
    },
    "column-3": {
      id: "column-3",
      title: "Size: Large",
      taskIds: []
    },
    "dummy-2": {
      id: "dummy-2",
      title: "",
      taskIds: [],
      type: "dummy"
    },
  },
  columnOrder: ["column-1", "dummy-0", "column-2", "dummy-1", "column-3","dummy-2"]
}

export default initialData;
