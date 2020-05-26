const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "example task1" }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To be Estimated",
      taskIds: ["task-1"]
    },
    "dummy-0": {
      id: "dummy-0",
      title: "",
      taskIds: [],
      type: "dummy"
    },
    "column-2": {
      id: "column-2",
      title: "Size: Small",
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
      title: "Size: Medium",
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
