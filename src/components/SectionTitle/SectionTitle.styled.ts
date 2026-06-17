import styled from 'styled-components';

// SectionHeader вирівнює заголовок секції та необов'язкову дію.
export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

// SectionText групує назву і опис секції.
export const SectionText = styled.div`
  display: grid;
  gap: 6px;
`;

// SectionHeading є основним заголовком сторінки або блоку.
export const SectionHeading = styled.h2`
  margin: 0;
  color: #fff7e6;
  font-size: 30px;
  letter-spacing: 0;
`;

// SectionDescription пояснює бізнес-контекст секції.
export const SectionDescription = styled.p`
  max-width: 680px;
  margin: 0;
  color: #aab4c5;
  line-height: 1.6;
`;
