import { ReactNode } from 'react';
import { SectionDescription, SectionHeader, SectionHeading, SectionText } from './SectionTitle.styled';

interface SectionTitleProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/**
 * Уніфікує заголовок сторінки або секції з необов’язковими описом і action-вузлом.
 * @param title — обов’язковий видимий заголовок.
 * @param description — необов’язковий пояснювальний текст; порожнє значення не створює абзац.
 * @param action — довільний React-вузол, який передається без змін праворуч від тексту.
 * @returns Лише презентаційну розмітку без локального стану й побічних ефектів.
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
