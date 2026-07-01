import type { ContactMessage } from '~/types/contact';

export const useContactsStore = defineStore('contacts', () => {
  const contactId = ref<number | null>(null);

  const { data: contacts, pending: pendingContacts } =
    useAPIContent<ContactMessage[]>('/contacts');

  const {
    pending: pendingContactDelete,
    error: errorContactDelete,
    refresh: refreshContactDelete,
  } = useAPIContent<ContactMessage>(() => `/contacts/${contactId.value}`, {
    method: 'DELETE',
    immediate: false,
    watch: false,
  });

  const deleteContact = async (id: number) => {
    contactId.value = id;

    await refreshContactDelete();

    if (errorContactDelete.value) return;

    if (contacts.value) {
      contacts.value = contacts.value.filter((c) => c.id !== id);
    }

    contactId.value = null;
  };

  return {
    contacts,
    pendingContacts,
    pendingContactDelete,
    errorContactDelete,
    deleteContact,
  };
});
