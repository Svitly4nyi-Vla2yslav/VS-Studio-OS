import { FormEvent, useState } from 'react';
import { Client, LEAD_SOURCES, LEAD_STATUSES, LeadSource, LeadStatus } from '../../utils/types';
import {
  FieldLabel,
  FormActions,
  FormGrid,
  FormPanel,
  PrimaryButton,
  SecondaryButton,
  TextInput,
} from './ClientForm.styled';

type ClientFormData = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

interface ClientFormProps {
  initialClient?: Client;
  submitLabel: string;
  onSubmit: (data: ClientFormData) => Promise<void> | void;
  onCancel: () => void;
}

/**
 * Перетворює необов’язкову CRM-картку на повний стан форми.
 * Для нового клієнта підставляє порожні поля, джерело Instagram і статус `new lead`,
 * а під час редагування зберігає наявні нотатки та повідомлення.
 */
const createInitialState = (client?: Client): ClientFormData => ({
  name: client?.name || '',
  company: client?.company || '',
  phone: client?.phone || '',
  email: client?.email || '',
  website: client?.website || '',
  instagram: client?.instagram || '',
  facebook: client?.facebook || '',
  linkedin: client?.linkedin || '',
  source: client?.source || 'Instagram',
  status: client?.status || 'new lead',
  notes: client?.notes || [],
  messages: client?.messages || [],
  nextAction: client?.nextAction || '',
});

/**
 * Рендерить контрольовану форму створення або редагування клієнта.
 * `onSubmit` отримує дані без службових id/міток часу, а `onCancel` лишається відповідальністю батьківського екрана.
 */
export const ClientForm = ({ initialClient, submitLabel, onSubmit, onCancel }: ClientFormProps) => {
  // Стан ініціалізується один раз із переданої картки; подальші зміни `initialClient` його не перезаписують.
  const [formData, setFormData] = useState<ClientFormData>(() => createInitialState(initialClient));

  /** Типобезпечно оновлює одне поле, не змінюючи решту значень і не звертаючись до сховища. */
  const updateField = <T extends keyof ClientFormData>(field: T, value: ClientFormData[T]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  /** Скасовує browser submit і очікує зовнішній `onSubmit`; збереження та обробку помилок виконує викликач. */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(formData);
  };

  return (
    <FormPanel onSubmit={handleSubmit}>
      <FormGrid>
        <FieldLabel>
          Client name
          <TextInput required value={formData.name} onChange={(event) => updateField('name', event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          Company
          <TextInput required value={formData.company} onChange={(event) => updateField('company', event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          Phone
          <TextInput required value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          Email
          <TextInput
            required
            type="email"
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </FieldLabel>
        <FieldLabel>
          Website
          <TextInput value={formData.website} onChange={(event) => updateField('website', event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          Instagram
          <TextInput value={formData.instagram} onChange={(event) => updateField('instagram', event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          Facebook
          <TextInput value={formData.facebook} onChange={(event) => updateField('facebook', event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          LinkedIn
          <TextInput value={formData.linkedin} onChange={(event) => updateField('linkedin', event.target.value)} />
        </FieldLabel>
        <FieldLabel>
          Lead source
          <TextInput
            as="select"
            value={formData.source}
            onChange={(event) => updateField('source', event.target.value as LeadSource)}
          >
            {LEAD_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </TextInput>
        </FieldLabel>
        <FieldLabel>
          Status
          <TextInput
            as="select"
            value={formData.status}
            onChange={(event) => updateField('status', event.target.value as LeadStatus)}
          >
            {LEAD_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </TextInput>
        </FieldLabel>
      </FormGrid>
      <FieldLabel>
        Next action
        <TextInput
          as="textarea"
          rows={3}
          value={formData.nextAction}
          onChange={(event) => updateField('nextAction', event.target.value)}
        />
      </FieldLabel>
      <FormActions>
        <PrimaryButton type="submit">{submitLabel}</PrimaryButton>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancel
        </SecondaryButton>
      </FormActions>
    </FormPanel>
  );
};
