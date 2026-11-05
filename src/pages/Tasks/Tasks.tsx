import { FormEvent, useEffect, useMemo, useState } from 'react';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { TaskCard } from '../../components/TaskCard/TaskCard';
import { getClients } from '../../utils/clientService';
import { createTask, getTasks } from '../../utils/taskService';
import { Client, ClientTask } from '../../utils/types';
import { FieldControl, FieldLabel, StatusText, SubmitButton, TaskForm, TaskFormGrid, TaskList, TasksStack } from './Tasks.styled';

// emptyTaskForm зберігає стартові значення для створення задачі.
const emptyTaskForm: Omit<ClientTask, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  dueDate: '',
  status: 'open',
  priority: 'medium',
  clientId: '',
};

/**
 * Показує CRM-задачі та форму створення нової задачі.
 *
 * Клієнти й задачі завантажуються паралельно через сервісний шар. Після
 * успішного створення форма очищається, а обидва списки перечитуються з Firestore.
 */
export const Tasks = () => {
  // tasks зберігає задачі, отримані через taskService.
  const [tasks, setTasks] = useState<ClientTask[]>([]);
  // clients зберігає клієнтів для показу прив'язки задачі.
  const [clients, setClients] = useState<Client[]>([]);
  // formData зберігає поточні поля нової задачі.
  const [formData, setFormData] = useState(emptyTaskForm);
  // loading показує стан завантаження task-модуля.
  const [loading, setLoading] = useState(true);
  // error зберігає повідомлення, якщо Firestore rules не дозволяють читання або запис.
  const [error, setError] = useState('');

  /**
   * Одночасно отримує задачі та клієнтів і синхронізує локальний стан сторінки.
   *
   * @sideEffects Перемикає loading, очищає/встановлює error і замінює обидва масиви.
   */
  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [taskData, clientData] = await Promise.all([getTasks(), getClients()]);
      setTasks(taskData);
      setClients(clientData);
    } catch {
      setError('Could not load tasks. Check Firebase configuration and Firestore rules.');
    } finally {
      setLoading(false);
    }
  };

  // Початкове читання виконується один раз після монтування.
  useEffect(() => {
    void loadData();
  }, []);

  /**
   * Індексує компанії за id для відображення прив’язки без повторних пошуків у масиві.
   *
   * @returns Map лише для клієнтів із непорожнім id.
   */
  const clientsById = useMemo(
    () => new Map(clients.filter((client) => client.id).map((client) => [client.id, client.company])),
    [clients],
  );

  /** Типобезпечно замінює одне поле чернетки, не змінюючи решту значень. */
  const updateField = <T extends keyof typeof formData>(field: T, value: (typeof formData)[T]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  /**
   * Скасовує стандартний submit і створює задачу через taskService.
   *
   * Порожній clientId перетворюється на undefined; після успіху форма очищається
   * й дані перечитуються. Помилка запису відображається у UI.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError('');
      await createTask({
        ...formData,
        clientId: formData.clientId || undefined,
      });
      setFormData(emptyTaskForm);
      await loadData();
    } catch {
      setError('Could not create task. Firestore rules do not allow writing yet.');
    }
  };

  return (
    <TasksStack>
      <SectionTitle title="Tasks" description="Track follow-ups, offers, calls, and client work connected to CRM leads." />
      <TaskForm onSubmit={handleSubmit}>
        <TaskFormGrid>
          <FieldLabel>
            Title
            <FieldControl required value={formData.title} onChange={(event) => updateField('title', event.target.value)} />
          </FieldLabel>
          <FieldLabel>
            Due date
            <FieldControl type="datetime-local" value={formData.dueDate} onChange={(event) => updateField('dueDate', event.target.value)} />
          </FieldLabel>
          <FieldLabel>
            Client
            <FieldControl as="select" value={formData.clientId} onChange={(event) => updateField('clientId', event.target.value)}>
              <option value="">Not connected</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.company}
                </option>
              ))}
            </FieldControl>
          </FieldLabel>
          <FieldLabel>
            Status
            <FieldControl as="select" value={formData.status} onChange={(event) => updateField('status', event.target.value as ClientTask['status'])}>
              <option value="open">open</option>
              <option value="in progress">in progress</option>
              <option value="done">done</option>
              <option value="cancelled">cancelled</option>
            </FieldControl>
          </FieldLabel>
          <FieldLabel>
            Priority
            <FieldControl as="select" value={formData.priority} onChange={(event) => updateField('priority', event.target.value as ClientTask['priority'])}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </FieldControl>
          </FieldLabel>
        </TaskFormGrid>
        <FieldLabel>
          Description
          <FieldControl as="textarea" rows={3} value={formData.description} onChange={(event) => updateField('description', event.target.value)} />
        </FieldLabel>
        <SubmitButton type="submit">Create task</SubmitButton>
      </TaskForm>

      {loading && <StatusText>Loading tasks...</StatusText>}
      {error && <StatusText>{error}</StatusText>}
      {!loading && !error && tasks.length === 0 && <EmptyState title="No tasks yet" description="Create the first follow-up or client action." />}
      <TaskList>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} clientName={task.clientId ? clientsById.get(task.clientId) : undefined} />
        ))}
      </TaskList>
    </TasksStack>
  );
};
