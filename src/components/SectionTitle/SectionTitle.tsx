import { ReactNode } from 'react';
import { SectionDescription, SectionHeader, SectionHeading, SectionText } from './SectionTitle.styled';

interface SectionTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

// Компонент SectionTitle уніфікує заголовки сторінок і ключових секцій.
export const SectionTitle = ({ title, description, action }: SectionTitleProps) => (
  <SectionHeader>
    <SectionText>
      <SectionHeading>{title}</SectionHeading>
      {description && <SectionDescription>{description}</SectionDescription>}
    </SectionText>
    {action}
  </SectionHeader>
);
