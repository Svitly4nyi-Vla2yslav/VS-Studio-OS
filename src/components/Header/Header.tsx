import { HeaderBadge, HeaderShell, HeaderTitle } from './Header.styled';

// Компонент Header показує верхній контекст CRM і статус першого MVP.
export const Header = () => (
  <HeaderShell>
    <HeaderTitle>VS Web Studio Business Dashboard</HeaderTitle>
    <HeaderBadge>MVP CRM</HeaderBadge>
  </HeaderShell>
);
