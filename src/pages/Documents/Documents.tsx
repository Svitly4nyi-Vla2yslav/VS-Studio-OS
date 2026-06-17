import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { DocumentList, DocumentPanel, DocumentTitle, DocumentsGrid } from './Documents.styled';

// Сторінка Documents готує архів документів і видимий Datenschutz/GDPR план.
export const Documents = () => (
  <>
    <SectionTitle
      title="Documents"
      description="Prepared structure for client documents, invoices, privacy requirements, and future exports."
    />
    <DocumentsGrid>
      <DocumentPanel>
        <DocumentTitle>Document archive preparation</DocumentTitle>
        <DocumentList>
          <li>Client files and future offers.</li>
          <li>Immutable document history for invoices and final files.</li>
          <li>E-Rechnung and GoBD-friendly audit log preparation.</li>
          <li>No silent invoice deletion in future finance flows.</li>
        </DocumentList>
      </DocumentPanel>
      <DocumentPanel>
        <DocumentTitle>GDPR / Datenschutz planning</DocumentTitle>
        <DocumentList>
          <li>Login and role access will be required later.</li>
          <li>Client deletion and data export must be possible.</li>
          <li>AI should receive only necessary client context.</li>
          <li>Privacy policy must document Firebase, OpenAI, Google Calendar, Web.de, and Meta.</li>
        </DocumentList>
      </DocumentPanel>
    </DocumentsGrid>
  </>
);
