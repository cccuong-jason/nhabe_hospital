<template>
  <div
    class='container xl:max-w-5.75xl lg:max-w-4.5xl md:max-w-2.625xl sm:max-w-0.25xl w-full lg:h-14 h-10 flex flex-nowrap basis-auto justify-between items-center mx-auto lg:px-3.75'
  >
    <div class='mr-9 pt-1.5'>
      <a class='inline-block py-2.5 whitespace-nowrap w-[80.45px]' href='/'>
        <img class='h-18' alt='...' src='@/assets/images/nhabe_logo.png' />
      </a>
    </div>
    <div class='relative inline-block lg:hidden w-11'>
      <div class='flex items-center'>
        <el-dropdown placement='bottom-end' trigger='click' popper-class='auth-menu-popper'>
          <MenuIcon class='cursor-pointer h-8 w-8 text-secondary' />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item divided>
                <div class='flex flex-col items-start gap-y-4 pt-4.5 pb-9'>
                  <router-link to='/dashboard' class='ml-1 py-px text-default text-sm font-medium'>
                    Bảng điều khiển
                  </router-link>
                  <router-link to='/login' class='ml-1 py-px text-default text-sm font-medium'>
                    Đăng nhập
                  </router-link>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class='hidden basis-auto lg:flex items-center w-full'>
      <div class='flex flex-row mr-auto items-center gap-11 md:h-10 lg:h-14'>
        <div>
          <router-link
            to='/dashboard'
            class='text-black text-sm hover:text-sky-400 font-normal'
          >
            Bảng điều khiển
          </router-link>
        </div>
        <div>
          <router-link
            to='/login'
            class='text-black text-sm hover:text-sky-400 font-normal'
          >
            Đăng nhập
          </router-link>
        </div>
      </div>
      <div class='flex flex-row items-center ml-auto gap-x-5.25 md:h-10 lg:h-14'>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { Shop } from '@element-plus/icons-vue'
import { MenuIcon, XIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'AuthenticationNav',
  components: {
    Shop,
    XIcon,
    MenuIcon,
  },
  setup() {
    return {}
  },
})
</script>
