import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// SidebarShell фіксує темну навігаційну панель з преміальним акцентом.
export const SidebarShell = styled.aside`
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(7, 10, 18, 0.92);
  padding: 28px 20px;

  @media (max-width: 900px) {
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 18px 16px;
  }
`;

// BrandBlock показує назву продукту і компанії.
export const BrandBlock = styled.div`
  margin-bottom: 28px;
`;

// BrandName є головним текстовим сигналом VS Studio OS у навігації.
export const BrandName = styled.h1`
  margin: 0;
  color: #f7d590;
  font-size: 22px;
  letter-spacing: 0;
`;

// BrandMeta пояснює призначення системи у короткому підписі.
export const BrandMeta = styled.p`
  margin: 6px 0 0;
  color: #9ba6ba;
  font-size: 13px;
`;

// NavList групує посилання на основні модулі.
export const NavList = styled.nav`
  display: grid;
  gap: 8px;
`;

// NavItem стилізує активні та неактивні маршрути застосунку.
export const NavItem = styled(NavLink)`
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 11px 12px;
  color: #dce3ef;
  font-size: 14px;
  transition: 160ms ease;

  &.active {
    border-color: rgba(247, 213, 144, 0.36);
    background: rgba(247, 213, 144, 0.12);
    color: #f7d590;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;
