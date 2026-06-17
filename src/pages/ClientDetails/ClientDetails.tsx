import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClientForm } from '../../components/ClientForm/ClientForm';
import { ClientStatusBadge } from '../../components/ClientStatusBadge/ClientStatusBadge';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import {
  addClientMessage,
  addClientNote,
  deleteClient,
  getClientById,
  updateClient,
  updateClientNextAction,
} from '../../utils/clientService';
import { getTasksByClientId } from '../../utils/taskService';
import { Client, ClientMessage, ClientTask } from '../../utils/types';
import {
  ActionsRow,
  DangerButton,
  DetailsGrid,
  DetailsStack,
  InfoLabel,
  InfoList,
  InfoValue,
  MutedText,
  Panel,
  PanelTitle,
  PrimaryButton,
  SelectField,
  TextArea,
  TimelineItem,
  TimelineList,
} from './ClientDetails.styled';

// Сторінка ClientDetails показує повну CRM-картку клієнта з ручною історією комунікацій.
export const ClientDetails = () => {
  // clientId береться з маршруту /clients/:clientId.
  const { clientId } = useParams();
  // navigate використовується для повернення після видалення клієнта.
  const navigate = useNavigate();
  // client зберігає повну CRM-картку, завантажену через clientService.
  const [client, setClient] = useState<Client | null>(null);
  // tasks зберігає задачі, пов'язані з цим клієнтом.
  const [tasks, setTasks] = useState<ClientTask[]>([]);
  // loading показує стан завантаження деталей.
  const [loading, setLoading] = useState(true);
  // isEditing керує показом форми редагування клієнта.
  const [isEditing, setIsEditing] = useState(false);
  // noteText зберігає нову ручну нотатку.
  const [noteText, setNoteText] = useState('');
  // messageText зберігає новий ручний запис комунікації.
  const [messageText, setMessageText] = useState('');
  // messageChannel зберігає канал комунікації для нового запису.
  const [messageChannel, setMessageChannel] = useState<ClientMessage['channel']>('email');
  // nextActionText зберігає чернетку наступної дії для клієнта.
  const [nextActionText, setNextActionText] = useState('');

  // loadDetails завантажує клієнта і його задачі через service-функції.
  const loadDetails = async () => {
    if (!clientId) {
      return;
    }

    setLoading(true);
    const [clientData, taskData] = await Promise.all([getClientById(clientId), getTasksByClientId(clientId)]);
    setClient(clientData);
    setTasks(taskData);
    setNextActionText(clientData?.nextAction || '');
    setLoading(false);
  };

  useEffect(() => {
    void loadDetails();
  }, [clientId]);

  // handleEdit зберігає оновлені поля клієнта через clientService.
  const handleEdit = async (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!client?.id) {
      return;
    }

    await updateClient(client.id, data);
    setIsEditing(false);
    await loadDetails();
  };

  // handleAddNote додає ручну нотатку до поточного клієнта.
  const handleAddNote = async () => {
    if (!client?.id || !noteText.trim()) {
      return;
    }

    await addClientNote(client.id, noteText.trim());
    setNoteText('');
    await loadDetails();
  };

  // handleAddMessage додає ручний запис комунікації до поточного клієнта.
  const handleAddMessage = async () => {
    if (!client?.id || !messageText.trim()) {
      return;
    }

    await addClientMessage(client.id, {
      channel: messageChannel,
      text: messageText.trim(),
    });
    setMessageText('');
    await loadDetails();
  };

  // handleUpdateNextAction оновлює nextAction без редагування всієї картки.
  const handleUpdateNextAction = async () => {
    if (!client?.id) {
      return;
    }

    await updateClientNextAction(client.id, nextActionText);
    await loadDetails();
  };

  // handleDelete видаляє клієнта і повертає користувача до списку.
  const handleDelete = async () => {
    if (!client?.id || !window.confirm('Delete this client?')) {
      return;
    }

    await deleteClient(client.id);
    navigate('/clients');
  };

  if (loading) {
    return <MutedText>Loading client details...</MutedText>;
  }

  if (!client) {
    return <MutedText>Client not found.</MutedText>;
  }

  return (
    <DetailsStack>
      <SectionTitle title={client.name} description={`Full CRM profile for ${client.company}.`} />
      <ActionsRow>
        <PrimaryButton onClick={() => setIsEditing(true)}>Edit client</PrimaryButton>
        <DangerButton onClick={handleDelete}>Delete client</DangerButton>
      </ActionsRow>

      {isEditing && (
        <ClientForm
          initialClient={client}
          submitLabel="Save client"
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <DetailsGrid>
        <Panel>
          <PanelTitle>Client information</PanelTitle>
          <InfoList>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>
              <ClientStatusBadge status={client.status} />
            </InfoValue>
            <InfoLabel>Source</InfoLabel>
            <InfoValue>{client.source}</InfoValue>
            <InfoLabel>Email</InfoLabel>
            <InfoValue>
              <a href={`mailto:${client.email}`}>{client.email}</a>
            </InfoValue>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>
              <a href={`tel:${client.phone}`}>{client.phone}</a>
            </InfoValue>
            <InfoLabel>Website</InfoLabel>
            <InfoValue>{client.website ? <a href={client.website}>{client.website}</a> : 'Not set'}</InfoValue>
            <InfoLabel>Instagram</InfoLabel>
            <InfoValue>{client.instagram || 'Not set'}</InfoValue>
            <InfoLabel>Facebook</InfoLabel>
            <InfoValue>{client.facebook || 'Not set'}</InfoValue>
            <InfoLabel>LinkedIn</InfoLabel>
            <InfoValue>{client.linkedin || 'Not set'}</InfoValue>
            <InfoLabel>Created</InfoLabel>
            <InfoValue>{client.createdAt || 'Not available'}</InfoValue>
            <InfoLabel>Updated</InfoLabel>
            <InfoValue>{client.updatedAt || 'Not available'}</InfoValue>
          </InfoList>
        </Panel>

        <Panel>
          <PanelTitle>Next action</PanelTitle>
          <TextArea rows={4} value={nextActionText} onChange={(event) => setNextActionText(event.target.value)} />
          <ActionsRow>
            <PrimaryButton onClick={handleUpdateNextAction}>Update next action</PrimaryButton>
          </ActionsRow>
        </Panel>
      </DetailsGrid>

      <DetailsGrid>
        <Panel>
          <PanelTitle>Notes</PanelTitle>
          <TextArea rows={4} value={noteText} onChange={(event) => setNoteText(event.target.value)} />
          <ActionsRow>
            <PrimaryButton onClick={handleAddNote}>Add note</PrimaryButton>
          </ActionsRow>
          <TimelineList>
            {client.notes.length === 0 && <MutedText>No notes yet.</MutedText>}
            {client.notes.map((note) => (
              <TimelineItem key={note.id}>
                <strong>{note.createdAt}</strong>
                <div>{note.text}</div>
              </TimelineItem>
            ))}
          </TimelineList>
        </Panel>

        <Panel>
          <PanelTitle>Message history</PanelTitle>
          <SelectField value={messageChannel} onChange={(event) => setMessageChannel(event.target.value as ClientMessage['channel'])}>
            <option value="email">email</option>
            <option value="phone">phone</option>
            <option value="instagram">instagram</option>
            <option value="facebook">facebook</option>
            <option value="linkedin">linkedin</option>
            <option value="meeting">meeting</option>
            <option value="other">other</option>
          </SelectField>
          <TextArea rows={4} value={messageText} onChange={(event) => setMessageText(event.target.value)} />
          <ActionsRow>
            <PrimaryButton onClick={handleAddMessage}>Add message</PrimaryButton>
          </ActionsRow>
          <TimelineList>
            {client.messages.length === 0 && <MutedText>No manual messages yet.</MutedText>}
            {client.messages.map((message) => (
              <TimelineItem key={message.id}>
                <strong>
                  {message.channel} - {message.createdAt}
                </strong>
                <div>{message.text}</div>
              </TimelineItem>
            ))}
          </TimelineList>
        </Panel>
      </DetailsGrid>

      <Panel>
        <PanelTitle>Tasks connected to this client</PanelTitle>
        <TimelineList>
          {tasks.length === 0 && <MutedText>No connected tasks yet.</MutedText>}
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} clientName={client.company} />
          ))}
        </TimelineList>
      </Panel>
    </DetailsStack>
  );
};
