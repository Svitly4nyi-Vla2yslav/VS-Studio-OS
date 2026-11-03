import { BrandBlock, BrandMeta, BrandName, NavItem, NavList, SidebarShell } from './Sidebar.styled';

/** Стала конфігурація зіставляє видимі підписи з маршрутами; кореневий Dashboard потребує точного збігу. */
const navigationItems = [
  { label: 'Dashboard', to: '/' },
  { label: 'Clients', to: '/clients' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Communication', to: '/communication' },
  { label: 'Documents', to: '/documents' },
  { label: 'Finance', to: '/finance' },
  { label: 'AI Assistant', to: '/ai-assistant' },
];

/**
 * Без аргументів рендерить бренд внутрішньої CRM та `NavLink` для кожного бізнес-модуля.
 * `navigationItems` є єдиним джерелом порядку й адрес, а `end` для `/` не дозволяє Dashboard
 * лишатися активним на вкладених сторінках. Компонент не має стану та побічних ефектів.
 */
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
