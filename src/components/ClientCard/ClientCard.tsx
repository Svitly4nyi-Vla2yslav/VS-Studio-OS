import { Client } from '../../utils/types';
import { ClientStatusBadge } from '../ClientStatusBadge/ClientStatusBadge';
import {
  Card,
  CardTop,
  ClientName,
  CompanyName,
  DetailsLink,
  MetaGrid,
  MetaItem,
  MetaLabel,
} from './ClientCard.styled';

interface ClientCardProps {
  client: Client;
}

// Компонент ClientCard відповідає за коротке відображення одного клієнта у списку CRM.
// Тут показується ім'я, компанія, статус, джерело ліда, контакти та наступна дія.
export const ClientCard = ({ client }: ClientCardProps) => {
  // nextActionText зберігає текст наступної дії або безпечний fallback.
  const nextActionText = client.nextAction || 'Next action is not set yet';

  return (
    <Card>
      <CardTop>
        <div>
          <ClientName>{client.name}</ClientName>
          <CompanyName>{client.company}</CompanyName>
        </div>
        <ClientStatusBadge status={client.status} />
      </CardTop>
      <MetaGrid>
        <MetaItem>
          <MetaLabel>Source</MetaLabel>
          {client.source}
        </MetaItem>
        <MetaItem>
          <MetaLabel>Email</MetaLabel>
          {client.email}
        </MetaItem>
        <MetaItem>
          <MetaLabel>Phone</MetaLabel>
          {client.phone}
        </MetaItem>
        <MetaItem>
          <MetaLabel>Next action</MetaLabel>
          {nextActionText}
        </MetaItem>
      </MetaGrid>
      <DetailsLink to={`/clients/${client.id}`}>Open details</DetailsLink>
    </Card>
  );
};
