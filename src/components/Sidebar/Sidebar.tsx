import { BrandBlock, BrandMeta, BrandName, NavItem, NavList, SidebarShell } from './Sidebar.styled';

// navigationItems зберігає головні маршрути внутрішньої системи.
const navigationItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Clients', to: '/clients' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Communication', to: '/communication' },
  { label: 'Documents', to: '/documents' },
  { label: 'Finance', to: '/finance' },
  { label: 'AI Assistant', to: '/ai-assistant' },
];

// Компонент Sidebar відповідає за навігацію між бізнес-модулями.
export const Sidebar = () => (
  <SidebarShell>
    <BrandBlock>
      <BrandName>VS Studio OS</BrandName>
      <BrandMeta>Internal CRM for VS Web Studio</BrandMeta>
    </BrandBlock>
    <NavList>
      {navigationItems.map((item) => (
        <NavItem key={item.to} to={item.to} end={item.to === '/'}>
          {item.label}
        </NavItem>
      ))}
    </NavList>
  </SidebarShell>
);
