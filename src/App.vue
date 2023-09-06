<template>
  <el-config-provider :zIndex='9999'>
    <ReportLayout v-if='isReportLayout' />
    <AuthLayout v-else-if='isAuthLayout' />
    <DefaultLayout v-else />
  </el-config-provider>
</template>

<script lang='ts'>
import { defineComponent, inject, computed, ComputedRef } from 'vue'
import { ElConfigProvider } from 'element-plus'
import DefaultLayout from './layouts/default-layout.vue'
import AuthLayout from 'layouts/auth-layout.vue'
import ReportLayout from 'layouts/report-layout.vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from 'store'
import login from 'modules/auth/views/login.vue'

export default defineComponent({
  components: {
    DefaultLayout,
    ElConfigProvider,
    AuthLayout,
    ReportLayout,
  },
  inheritAttrs: false,

  setup() {
    const $message = inject<IMessage>('$message')
    const router = useRoute()
    const store = useStore()
    const routerNavigation = useRouter()
    const isAuthLayout = computed(() => !router.meta?.requiresAuth)
    const isAuthenticated = computed<boolean>(() => store.auth.getAuthenticationState)
    const isReportLayout: ComputedRef<boolean> = computed(() => router.meta?.layout === 'report')
    const initialize = () => {
      console.log(`isAuthLayout ${isAuthLayout.value} isReportLayout ${isReportLayout.value}`)
      return Promise.resolve()
    }
    initialize().catch((error: Error) => {
      $message?.error(`Couldn't initialize the system with error: ${error.message}`)
    })

    routerNavigation.beforeEach(async (to, from) => {
      if (!isAuthenticated.value && isAuthLayout.value) {
        if (to.name !== 'login' && to.name !== 'Reports' && to.name !== 'CreateReport' && to.name !== 'Home') {
          await routerNavigation.push({ name: 'login' })
        }
        return
      }
    })

    return { zIndex: 3000, size: 'small', isAuthLayout, isReportLayout }
  },
})
</script>
<style>
#global-loading {
  z-index: 120000;
}
</style>
