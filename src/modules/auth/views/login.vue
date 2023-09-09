<template>
  <div v-if='!isAuthenticated'>
    <div
      class='relative w-full bg-gradient-to-r from-blue-410 to-blue-450 py-24 lg:py-32 lg:pt-40'
    >
      <div
        class='container xl:max-w-5.75xl lg:max-w-4.5xl md:max-w-2.625xl sm:max-w-0.25xl w-full mx-auto px-3.75'
      >
        <div class='text-center mb-12'>
          <div class='flex flex-wrap -mx-3.75 justify-center px-3.75'>
            <div class='md:flex-9 md:max-w-9/12 lg:flex-8 lg:max-w-2/3'>
              <WelcomeLabel />
            </div>
          </div>
        </div>
      </div>
      <SplitBackground />
    </div>
    <div
      class='container relative xl:max-w-5.75xl lg:max-w-4.5xl md:max-w-2.625xl sm:max-w-0.25xl w-full mx-auto px-3.75 pb-12'
    >
      <div class='relative lg:max-w-5/12 md:max-w-7/12 w-full mx-auto md:px-2 -mt-32'>
        <LoginForm :email="'nhabe_admin'" />
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import useStore from 'store'
import SplitBackground from './components/SplitBackground.vue'
import LoginForm from './components/LoginForm.vue'
import WelcomeLabel from './components/WelcomeLabel.vue'
import { useAuthorizationTokenStore } from 'modules/auth/store/state'

export default defineComponent({
  components: {
    SplitBackground,
    LoginForm,
    WelcomeLabel,
  },
  setup() {
    const store = useStore()
    const authorizationTokenStore = useAuthorizationTokenStore()
    const isAuthenticated = computed<boolean>(() => authorizationTokenStore.access_token !== '')
    console.log('isAuthenticated', isAuthenticated.value)
    const accounts: string[] = ['admin@nhabe.com', 'creator@nhabe.com', 'member@nhabe.com']
    return {
      isAuthenticated,
      accounts,
    }
  },
})
</script>
