<script setup lang="ts">
const { t } = useI18n();
const authStore = useAuthStore();
const contactsStore = useContactsStore();
const router = useRouter();
const route = useRoute();

const messagesCount = computed(() => contactsStore.contacts?.length ?? 0);

const messagesCountLabel = computed(() =>
  messagesCount.value > 9 ? '9+' : String(messagesCount.value)
);

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-[#050e1d]">
    <header class="sticky top-0 z-50 glass border-b border-white/10">
      <div
        class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16"
      >
        <NuxtLink to="/" class="flex items-center gap-3 group">
          <IconLogo
            class="transition-transform duration-300 group-hover:rotate-6 shrink-0 w-[36px] h-[36px]"
          />
          <div class="flex items-baseline gap-1.5">
            <span
              class="font-display font-bold text-base tracking-widest text-white uppercase"
            >
              {{ t('brand') }}
            </span>
            <span
              class="text-[10px] font-medium text-ocean-400 tracking-wider uppercase"
              >CRM
            </span>
          </div>
        </NuxtLink>

        <nav class="flex items-center gap-6">
          <NuxtLink
            to="/dashboard"
            class="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
            :class="{ 'text-white': route.path === '/dashboard' }"
          >
            {{ t('nav.dashboard') }}
          </NuxtLink>
          <NuxtLink
            to="/orders"
            class="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
            :class="{ 'text-white': route.path.startsWith('/orders') }"
          >
            {{ t('nav.orders') }}
          </NuxtLink>
          <NuxtLink
            to="/messages"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
            :class="{ 'text-white': route.path.startsWith('/messages') }"
          >
            {{ t('nav.messages') }}
            <span
              v-if="messagesCount"
              class="relative -top-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-ocean-500 text-[10px] font-semibold leading-none text-white"
            >
              {{ messagesCountLabel }}
            </span>
          </NuxtLink>
        </nav>

        <button
          class="text-sm text-white/50 hover:text-white transition-colors duration-200 tracking-wide"
          @click="logout"
        >
          {{ t('nav.logout') }}
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <slot />
    </main>
  </div>
</template>
