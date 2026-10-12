import { ReactNode } from 'react';
import { SectionDescription, SectionHeader, SectionHeading, SectionText } from './SectionTitle.styled';

interface SectionTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/**
 * Уніфікує заголовок сторінки або секції з необов’язковими описом і action-вузлом.
 * Порожній `description` не створює зайвої розмітки, а `action` передається без змін праворуч від тексту.
 */
export const SectionTitle = ({ title, description, action }: SectionTitleProps) => (
  <SectionHeader>
    <SectionText>
      <SectionHeading>{title}</SectionHeading>
      {description && <SectionDescription>{description}</SectionDescription>}
    </SectionText>
    {action}
  </SectionHeader>
);
