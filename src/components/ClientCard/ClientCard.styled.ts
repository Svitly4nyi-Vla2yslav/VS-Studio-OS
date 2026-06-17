import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Card створює компактну CRM-картку для одного клієнта або ліда.
export const Card = styled.article`
  display: grid;
  gap: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 18px;
  background: rgba(13, 18, 30, 0.88);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
`;

// CardTop вирівнює ім'я клієнта і статус.
export const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

// ClientName показує головне ім'я контакту.
export const ClientName = styled.h3`
  margin: 0;
  color: #fff7e6;
  font-size: 18px;
`;

// CompanyName показує компанію клієнта.
export const CompanyName = styled.p`
  margin: 4px 0 0;
  color: #aab4c5;
  font-size: 14px;
`;

// MetaGrid групує email, телефон, джерело і наступну дію.
export const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

// MetaItem відображає одну пару label/value у картці.
export const MetaItem = styled.div`
  min-width: 0;
  color: #dce3ef;
  font-size: 14px;
`;

// MetaLabel робить технічні підписи менш помітними.
export const MetaLabel = styled.span`
  display: block;
  margin-bottom: 3px;
  color: #7f8aa0;
  font-size: 12px;
`;

// DetailsLink веде на повну сторінку клієнта.
export const DetailsLink = styled(Link)`
  width: fit-content;
  border: 1px solid rgba(247, 213, 144, 0.34);
  border-radius: 8px;
  padding: 9px 12px;
  color: #f7d590;
  background: rgba(247, 213, 144, 0.08);
  font-size: 14px;
`;
