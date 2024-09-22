import React from 'react';
import { Task } from '../types';
import { Card, CardContent, Typography, Button } from '@mui/material';

interface TaskProps {
  task: Task;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const statusColors = {
  'Not Started': '#f44336',
  'In Progress': '#ff9800',
  Finished: '#4caf50',
};

const TaskComponent: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card
      style={{ margin: '10px', backgroundColor: statusColors[task.status] }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {task.description}
        </Typography>
        <Typography variant="body2">Status: {task.status}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(task.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default TaskComponent;
