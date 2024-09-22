import React, { useState } from 'react';
import { Task } from './types';
import TaskComponent from './component/TaskComponent';
import { Container, Button, TextField, Grid, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Pagination } from '@mui/material';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, description: 'Task 1', status: 'Not Started' },
    { id: 2, description: 'Task 2', status: 'In Progress' },
  ]);

  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [taskStatus, setTaskStatus] = useState<'Not Started' | 'In Progress' | 'Finished'>('Not Started');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortOption, setSortOption] = useState<'description' | 'status'>('description');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Not Started' | 'In Progress' | 'Finished'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;

  const openEditModal = (task: Task) => {
    setNewTaskDescription(task.description);
    setTaskStatus(task.status);
    setEditingTaskId(task.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTaskId(null);
    setNewTaskDescription('');
  };

  const saveTask = () => {
    if (editingTaskId !== null) {
      setTasks(tasks.map((task) =>
        task.id === editingTaskId ? { ...task, description: newTaskDescription, status: taskStatus } : task
      ));
      closeModal();
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks by status
  const filteredTasks = filterStatus === 'All' ? tasks : tasks.filter(task => task.status === filterStatus);

  // Sort tasks by selected option 
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === 'description') {
      return a.description.localeCompare(b.description);
    } else {
      return a.status.localeCompare(b.status);
    }
  });

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <Container>
      <h1>Task Manager</h1>

      <TextField
        label="New Task Description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={editingTaskId ? saveTask : () => {
          const newTask: Task = {
            id: tasks.length + 1,
            description: newTaskDescription,
            status: 'Not Started',
          };
          setTasks([...tasks, newTask]);
          setNewTaskDescription('');
        }}
        style={{ marginBottom: '20px' }}
      >
        {editingTaskId ? 'Save Task' : 'Add Task'}
      </Button>

      {/* Sorting and Filtering */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as 'description' | 'status')}
        >
          <MenuItem value="description">Description</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Filter By Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Not Started' | 'In Progress' | 'Finished')}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Finished">Finished</MenuItem>
        </Select>
      </FormControl>

      {/* Display Tasks */}
      <Grid container spacing={2}>
        {currentTasks.map((task) => (
          <Grid item xs={6} key={task.id}>
            <TaskComponent task={task} onEdit={() => openEditModal(task)} onDelete={deleteTask} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(sortedTasks.length / tasksPerPage)}
        page={currentPage}
        onChange={(e, page) => setCurrentPage(page)}
        color="primary"
        style={{ marginTop: '20px' }}
      />

      {/* Modal for Editing Task */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={taskStatus}
              onChange={(e) => setTaskStatus(e.target.value as 'Not Started' | 'In Progress' | 'Finished')}
            >
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Finished">Finished</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveTask} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
