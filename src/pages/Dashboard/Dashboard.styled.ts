import styled from 'styled-components';

// DashboardGrid розкладає ключові оглядові блоки першого MVP.
export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

// DashboardCard показує один напрямок системи VS Studio OS.
export const DashboardCard = styled.article`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 18px;
  background: rgba(13, 18, 30, 0.88);
`;

// DashboardCardTitle є назвою оглядового блоку.
export const DashboardCardTitle = styled.h3`
  margin: 0 0 8px;
  color: #fff7e6;
`;

// DashboardCardText пояснює поточний стан модуля.
export const DashboardCardText = styled.p`
  margin: 0;
  color: #aab4c5;
  line-height: 1.6;
`;
