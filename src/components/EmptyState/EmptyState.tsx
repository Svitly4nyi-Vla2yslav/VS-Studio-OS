import { EmptyStateBox, EmptyStateDescription, EmptyStateTitle } from './EmptyState.styled';

interface EmptyStateProps {
  title: string;
  description: string;
}

/**
 * Показує стандартизований порожній стан для клієнтів, задач або документів.
 * Приймає готові title і description та повертає лише презентаційну розмітку без стану
 * й побічних ефектів; локалізацію текстів забезпечує батьківський компонент.
 */
export const EmptyState = ({ title, description }: EmptyStateProps) => (
  <EmptyStateBox>
    <EmptyStateTitle>{title}</EmptyStateTitle>
    <EmptyStateDescription>{description}</EmptyStateDescription>
  </EmptyStateBox>
);

