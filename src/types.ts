export interface Task {
    id: number;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Finished';
  }
  