import styled from 'styled-components';

// PageShell формує основну сітку застосунку: sidebar + робоча зона.
export const PageShell = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(211, 169, 92, 0.14), transparent 36rem),
    #070a12;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// MainArea містить header і активну сторінку маршруту.
export const MainArea = styled.main`
  min-width: 0;
  padding: 24px;

  @media (max-width: 640px) {
    padding: 16px;
  }
`;

// ContentArea обмежує ширину робочого контенту для читабельності.
export const ContentArea = styled.div`
  max-width: 1180px;
  margin: 0 auto;
`;
