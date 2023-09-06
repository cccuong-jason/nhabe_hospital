<template>
  <el-scrollbar
    class='relative w-full overflow-y-auto h-screen'
    v-loading.fullscreen.lock='isLoading'
  >
    <div class='relative'>
      <div class='absolute w-full z-100 p-4 bg-transparent border-0'>
        <AuthNavigation />
      </div>

      <div class='relative w-full h-full'>
        <router-view v-slot='{ Component }'>
          <component :is='Component' />
        </router-view>
      </div>
    </div>
    <div
      class='container relative xl:max-w-5.75xl lg:max-w-4.5xl md:max-w-2.625xl sm:max-w-0.25xl w-full py-13 lg:pb-4.5 mx-auto px-4'
    >
      <Footer />
    </div>
  </el-scrollbar>
</template>

<script lang='ts'>
import { defineComponent, computed, ref } from 'vue'
import useStore from 'store'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const loading = computed(() => store.global.loading)
    const isLoading = ref(false)

    const beforeRouteEnter = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      next((vm: any) => {
        vm.isLoading.value = true;
      });
    };

    const beforeRouteLeave = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      isLoading.value = false;
      next();
    };

    return {
      loading,
      isLoading,
      beforeRouteEnter,
      beforeRouteLeave
    }
  },
})
</script>
