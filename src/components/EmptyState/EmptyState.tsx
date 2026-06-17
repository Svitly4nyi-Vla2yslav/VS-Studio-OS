import { EmptyStateBox, EmptyStateDescription, EmptyStateTitle } from './EmptyState.styled';

interface EmptyStateProps {
  title: string;
  description: string;
}

// Компонент EmptyState відповідає за порожні списки клієнтів, задач або документів.
export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <EmptyStateBox>
    <EmptyStateTitle>{title}</EmptyStateTitle>
    <EmptyStateDescription>{description}</EmptyStateDescription>
  </EmptyStateBox>
);
