import { ClientTask } from '../../utils/types';
import { TaskArticle, TaskDescription, TaskHeader, TaskMeta, TaskPill, TaskTitle } from './TaskCard.styled';

interface TaskCardProps {
  task: ClientTask;
  clientName?: string;
}

/**
 * Приймає ClientTask і необов’язкове ім’я клієнта та повертає презентаційну картку завдання.
 * Опис рендериться лише за непорожнього значення; відсутні dueDate і clientName отримують
 * текстові fallback-підписи. Компонент лише читає props і не змінює завдання чи зовнішній стан.
 */
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
