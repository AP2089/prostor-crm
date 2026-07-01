<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

definePageMeta({ layout: false });

const { t } = useI18n();
const auth = useAuthStore();
const router = useRouter();
const loginError = ref(false);

const validationSchema = computed(() =>
  toTypedSchema(
    z.object({
      username: z.string().min(1, t('validation.required')),
      password: z.string().min(1, t('validation.required')),
    })
  )
);

const { handleSubmit, defineField, errors } = useForm({
  validationSchema,
});
const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit((values) => {
  loginError.value = false;
  if (!auth.login(values.username, values.password)) {
    loginError.value = true;
  } else {
    router.push('/dashboard');
  }
});
</script>

<template>
  <div class="min-h-screen bg-[#050e1d] flex items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="flex flex-col items-center mb-8">
        <IconLogo class="mb-4 w-[52px] h-[52px]" />
        <h1
          class="font-display font-bold text-2xl tracking-widest text-white uppercase"
        >
          {{ t('brand') }}
        </h1>
        <p
          class="text-ocean-400 text-xs font-medium tracking-wider uppercase mt-1"
        >
          CRM
        </p>
      </div>

      <div class="glass border border-white/10 rounded-2xl p-8">
        <p
          class="text-white/60 text-sm text-center mb-6 uppercase tracking-wider"
        >
          {{ t('login.title') }}
        </p>
        <form class="space-y-4" @submit="onSubmit">
          <div class="space-y-1.5">
            <label
              class="block text-xs font-medium text-white/60 uppercase tracking-wider"
            >
              {{ t('login.username') }}
            </label>
            <input
              v-model="username"
              v-bind="usernameAttrs"
              type="text"
              autocomplete="username"
              class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-ocean-500 transition-colors"
            />
            <p v-if="errors.username" class="text-red-400 text-xs">
              {{ errors.username }}
            </p>
          </div>
          <div class="space-y-1.5">
            <label
              class="block text-xs font-medium text-white/60 uppercase tracking-wider"
            >
              {{ t('login.password') }}
            </label>
            <input
              v-model="password"
              v-bind="passwordAttrs"
              type="password"
              autocomplete="current-password"
              class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-ocean-500 transition-colors"
            />
            <p v-if="errors.password" class="text-red-400 text-xs">
              {{ errors.password }}
            </p>
          </div>
          <p v-if="loginError" class="text-red-400 text-sm text-center">
            {{ t('login.error') }}
          </p>
          <button
            type="submit"
            class="w-full mt-2 py-2.5 rounded-lg bg-ocean-500 hover:bg-ocean-600 text-white text-sm font-semibold tracking-wide transition-colors duration-200"
          >
            {{ t('login.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
