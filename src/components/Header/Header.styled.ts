import styled from 'styled-components';

// HeaderShell утримує верхній рядок сторінки з контекстом системи.
export const HeaderShell = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1180px;
  margin: 0 auto 24px;
`;

// HeaderTitle показує робочу назву внутрішньої операційної системи.
export const HeaderTitle = styled.div`
  color: #f6f1e8;
  font-size: 18px;
  font-weight: 700;
`;

// HeaderBadge підкреслює MVP-статус продукту.
export const HeaderBadge = styled.span`
  border: 1px solid rgba(247, 213, 144, 0.28);
  border-radius: 999px;
  padding: 7px 12px;
  color: #f7d590;
  background: rgba(247, 213, 144, 0.08);
  font-size: 13px;
`;
