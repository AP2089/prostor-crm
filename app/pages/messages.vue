<script setup lang="ts">
import { toast } from 'vue-sonner';

const { t } = useI18n();
const contactsStore = useContactsStore();
const deleteDialogOpen = ref(false);
const contactToDelete = ref<number | null>(null);

const sortedContacts = computed(() =>
  [...(contactsStore.contacts ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
);

const openDeleteDialog = (id: number) => {
  contactToDelete.value = id;
  deleteDialogOpen.value = true;
};

const confirmDelete = async () => {
  const id = contactToDelete.value;

  if (id === null) return;

  await contactsStore.deleteContact(id);

  contactToDelete.value = null;
};

watch(
  () => contactsStore.errorContactDelete,
  (newVal) => {
    if (newVal) {
      toast.error(t('errors.messageDelete'));
    }
  }
);
</script>

<template>
  <div>
    <h1 class="font-display font-bold text-2xl tracking-wide text-white mb-8">
      {{ t('messages.title') }}
    </h1>

    <Loader v-if="contactsStore.pendingContacts" />

    <div v-else class="glass border border-white/10 rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-white/5 border-b border-white/10">
          <tr>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('messages.customer') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('messages.email') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('messages.message') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('messages.date') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('messages.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr
            v-for="contact in sortedContacts"
            :key="contact.id"
            class="hover:bg-white/5 transition-colors duration-150"
          >
            <td class="px-4 py-3">
              <p class="font-medium text-white">{{ contact.name }}</p>
              <p class="text-xs text-white/40 mt-0.5">{{ contact.phone }}</p>
            </td>
            <td class="px-4 py-3 text-white/70">{{ contact.email }}</td>
            <td class="px-4 py-3 max-w-xs">
              <p class="text-white/70 line-clamp-2">{{ contact.message }}</p>
            </td>
            <td class="px-4 py-3 text-xs text-white/40 whitespace-nowrap">
              {{ formatDate(contact.createdAt) }}
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  class="text-xs px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors font-medium"
                  @click="openDeleteDialog(contact.id)"
                >
                  {{ t('messages.delete') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!sortedContacts.length"
        class="text-center py-16 text-white/30"
      >
        {{ t('messages.empty') }}
      </div>
    </div>

    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t('messages.delete') }}</AlertDialogTitle>
          <AlertDialogDescription>
            {{ t('messages.confirmDelete') }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            :disabled="contactsStore.pendingContactDelete"
            @click="contactToDelete = null"
          >
            {{ t('messages.cancel') }}
          </AlertDialogCancel>
          <AlertDialogAction
            :disabled="contactsStore.pendingContactDelete"
            @click="confirmDelete"
          >
            <IconSpinner
              v-if="contactsStore.pendingContactDelete"
              class="w-4 h-4 animate-spin"
            />
            <template v-else>{{ t('messages.delete') }}</template>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
