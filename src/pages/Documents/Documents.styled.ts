import styled from 'styled-components';

// DocumentsGrid розкладає блоки документів і Datenschutz-планування.
export const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

// DocumentPanel показує один майбутній напрямок документів або GDPR.
export const DocumentPanel = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 20px;
  background: rgba(13, 18, 30, 0.88);
`;

// DocumentTitle є назвою блоку документів.
export const DocumentTitle = styled.h3`
  margin: 0 0 12px;
  color: #fff7e6;
`;

// DocumentList показує вимоги до документів і Datenschutz.
export const DocumentList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #dce3ef;
  line-height: 1.8;
`;
