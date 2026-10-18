import { HeaderBadge, HeaderShell, HeaderTitle } from './Header.styled';

/**
 * Показує незмінний верхній контекст CRM: назву бізнес-панелі та статус MVP.
 * Компонент не приймає props, не керує станом і не виконує побічних ефектів.
 */
export const Header = () => (
  <HeaderShell>
    <HeaderTitle>VS Web Studio Business Dashboard</HeaderTitle>
    <HeaderBadge>MVP CRM</HeaderBadge>
  </HeaderShell>
);
