import styled from 'styled-components';

// FinanceGrid показує майбутні фінансові підмодулі.
export const FinanceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// FinanceCard показує один майбутній фінансовий розділ.
export const FinanceCard = styled.article`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 18px;
  background: rgba(13, 18, 30, 0.88);
`;

// FinanceTitle є назвою фінансового розділу.
export const FinanceTitle = styled.h3`
  margin: 0 0 8px;
  color: #fff7e6;
`;

// FinanceText пояснює призначення майбутнього розділу.
export const FinanceText = styled.p`
  margin: 0;
  color: #aab4c5;
  line-height: 1.6;
`;

// TaxNotice показує обережне юридично-бізнесове попередження.
export const TaxNotice = styled.div`
  border: 1px solid rgba(247, 213, 144, 0.26);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 18px;
  color: #f7d590;
  background: rgba(247, 213, 144, 0.08);
`;
