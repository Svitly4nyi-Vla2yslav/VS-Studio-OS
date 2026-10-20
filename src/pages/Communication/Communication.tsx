import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { CommunicationList, CommunicationPanel } from './Communication.styled';

/**
 * Показує межі майбутнього модуля комунікацій і запланованої Web.de інтеграції.
 * Компонент статичний: не читає історію клієнтів, не створює чернеток і не надсилає email.
 */
export const Communication = () => (
  <>
    <SectionTitle
      title="Communication"
      description="Manual communication history is stored in client details. Web.de integration will be added later."
    />
    <CommunicationPanel>
      <CommunicationList>
        <li>Manual notes for email, phone, social media, and meetings.</li>
        <li>Future email account: VS Studio Anfrage, vs.studio.anfrage@web.de.</li>
        <li>Email drafts will be prepared through emailService before any real sending is implemented.</li>
      </CommunicationList>
    </CommunicationPanel>
  </>
);
