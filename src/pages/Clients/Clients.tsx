import { useEffect, useMemo, useState } from 'react';
import { ClientCard } from '../../components/ClientCard/ClientCard';
import { ClientFilters } from '../../components/ClientFilters/ClientFilters';
import { ClientForm } from '../../components/ClientForm/ClientForm';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { createClient, getClients, updateClient } from '../../utils/clientService';
import { Client, LeadSource, LeadStatus } from '../../utils/types';
import { ClientGrid, PageStack, PrimaryAction, StatusText } from './Clients.styled';

// Сторінка Clients є першим реальним MVP-модулем для CRM клієнтів і лідів.
export const Clients = () => {
  // clients зберігає список клієнтів, отриманий тільки через clientService.
  const [clients, setClients] = useState<Client[]>([]);
  // loading показує стан першого завантаження CRM-даних.
  const [loading, setLoading] = useState(true);
  // error зберігає текст помилки Firebase або мережі.
  const [error, setError] = useState('');
  // search зберігає текст пошуку за ім'ям, компанією або email.
  const [search, setSearch] = useState('');
  // statusFilter зберігає активний фільтр за CRM-статусом.
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  // sourceFilter зберігає активний фільтр за джерелом ліда.
  const [sourceFilter, setSourceFilter] = useState<LeadSource | 'all'>('all');
  // isFormOpen керує показом форми додавання нового клієнта.
  const [isFormOpen, setIsFormOpen] = useState(false);
  // editingClient зберігає клієнта, якого зараз редагують.
  const [editingClient, setEditingClient] = useState<Client | undefined>();

  // loadClients завантажує список клієнтів з Firestore через сервісний шар.
  const loadClients = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getClients();
      setClients(data);
    } catch {
      setError('Could not load clients. Check Firebase configuration and Firestore rules.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadClients();
  }, []);

  // filteredClients застосовує пошук, фільтр статусу і фільтр джерела до локального списку.
  const filteredClients = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return clients.filter((client) => {
      const matchesSearch =
        !normalizedSearch ||
        client.name.toLowerCase().includes(normalizedSearch) ||
        client.company.toLowerCase().includes(normalizedSearch) ||
        client.email.toLowerCase().includes(normalizedSearch);
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesSource = sourceFilter === 'all' || client.source === sourceFilter;

      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [clients, search, sourceFilter, statusFilter]);

  // handleCreate створює нового клієнта у Firebase через clientService.
  const handleCreate = async (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError('');
      await createClient(data);
      setIsFormOpen(false);
      await loadClients();
    } catch {
      setError('Could not create client. Firestore rules do not allow writing yet.');
    }
  };

  // handleUpdate оновлює існуючу CRM-картку через clientService.
  const handleUpdate = async (data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingClient?.id) {
      return;
    }

    try {
      setError('');
      await updateClient(editingClient.id, data);
      setEditingClient(undefined);
      await loadClients();
    } catch {
      setError('Could not update client. Firestore rules do not allow writing yet.');
    }
  };

  return (
    <PageStack>
      <SectionTitle
        title="Clients"
        description="Manage leads, contacts, communication history, and next actions for VS Web Studio."
        action={<PrimaryAction onClick={() => setIsFormOpen(true)}>Add client</PrimaryAction>}
      />

      {isFormOpen && (
        <ClientForm submitLabel="Create client" onSubmit={handleCreate} onCancel={() => setIsFormOpen(false)} />
      )}

      {editingClient && (
        <ClientForm
          initialClient={editingClient}
          submitLabel="Save client"
          onSubmit={handleUpdate}
          onCancel={() => setEditingClient(undefined)}
        />
      )}

      <ClientFilters
        search={search}
        status={statusFilter}
        source={sourceFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onSourceChange={setSourceFilter}
      />

      {loading && <StatusText>Loading clients...</StatusText>}
      {error && <StatusText>{error}</StatusText>}

      {!loading && !error && filteredClients.length === 0 && (
        <EmptyState title="No clients found" description="Add your first lead or adjust the search filters." />
      )}

      <ClientGrid>
        {filteredClients.map((client) => (
          <div key={client.id}>
            <ClientCard client={client} />
            <PrimaryAction onClick={() => setEditingClient(client)}>Edit client</PrimaryAction>
          </div>
        ))}
      </ClientGrid>
    </PageStack>
  );
};
