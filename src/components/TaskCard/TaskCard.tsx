import { ClientTask } from '../../utils/types';
import { TaskArticle, TaskDescription, TaskHeader, TaskMeta, TaskPill, TaskTitle } from './TaskCard.styled';

interface TaskCardProps {
  task: ClientTask;
  clientName?: string;
}

// Компонент TaskCard відповідає за коротке відображення задачі у task-модулі.
export const TaskCard = ({ task, clientName }: TaskCardProps) => (
  <TaskArticle>
    <TaskHeader>
      <TaskTitle>{task.title}</TaskTitle>
      <TaskPill>{task.priority}</TaskPill>
    </TaskHeader>
    {task.description && <TaskDescription>{task.description}</TaskDescription>}
    <TaskMeta>
      <TaskPill>Status: {task.status}</TaskPill>
      <TaskPill>Due: {task.dueDate || 'No due date'}</TaskPill>
      <TaskPill>Client: {clientName || 'Not connected'}</TaskPill>
    </TaskMeta>
  </TaskArticle>
);
