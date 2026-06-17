import styled from 'styled-components';

// DetailsStack задає вертикальну структуру сторінки деталей клієнта.
export const DetailsStack = styled.div`
  display: grid;
  gap: 18px;
`;

// DetailsGrid розкладає основну інформацію і CRM-історію у дві колонки.
export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
  gap: 16px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

// Panel використовується для блоків інформації, нотаток, повідомлень і задач.
export const Panel = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 18px;
  background: rgba(13, 18, 30, 0.88);
`;

// PanelTitle є заголовком окремого блоку деталей.
export const PanelTitle = styled.h3`
  margin: 0 0 12px;
  color: #fff7e6;
`;

// InfoList показує пари label/value для клієнта.
export const InfoList = styled.dl`
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: 10px;
  margin: 0;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

// InfoLabel підписує значення у деталях клієнта.
export const InfoLabel = styled.dt`
  color: #7f8aa0;
`;

// InfoValue показує конкретні дані клієнта.
export const InfoValue = styled.dd`
  margin: 0;
  color: #dce3ef;
`;

// ActionsRow групує кнопки дій на сторінці деталей.
export const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

// PrimaryButton використовується для основних CRM-дій.
export const PrimaryButton = styled.button`
  border: 0;
  border-radius: 8px;
  padding: 10px 13px;
  color: #11131a;
  background: #f7d590;
  font-weight: 800;
`;

// DangerButton використовується для видалення клієнта.
export const DangerButton = styled.button`
  border: 1px solid rgba(255, 143, 143, 0.38);
  border-radius: 8px;
  padding: 10px 13px;
  color: #ffb2b2;
  background: rgba(255, 143, 143, 0.08);
`;

// TextArea є полем для нотаток, повідомлень і next action.
export const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  color: #f6f1e8;
  background: rgba(7, 10, 18, 0.82);
  resize: vertical;
`;

// SelectField стилізує вибір каналу комунікації.
export const SelectField = styled.select`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 11px 12px;
  color: #f6f1e8;
  background: rgba(7, 10, 18, 0.82);
`;

// TimelineList показує ручну історію нотаток і повідомлень.
export const TimelineList = styled.div`
  display: grid;
  gap: 10px;
`;

// TimelineItem показує один запис історії клієнта.
export const TimelineItem = styled.article`
  border-left: 2px solid rgba(247, 213, 144, 0.42);
  padding-left: 12px;
  color: #dce3ef;
`;

// MutedText використовується для службових і порожніх станів.
export const MutedText = styled.p`
  margin: 0;
  color: #aab4c5;
  line-height: 1.6;
`;
