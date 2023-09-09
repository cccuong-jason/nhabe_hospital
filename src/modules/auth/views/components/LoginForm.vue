<template>
  <div class='w-full'>
    <el-card class='bg-secondary text-center pb-6'>
      <div class='content-center items-center w-full lg:p-6'>
        <div class='mb-4 mt-2 text-center'>
          <small class='block w-full text-12.8 mb-6 text-muted'>{{ description }}</small>
        </div>
        <el-form ref='reportFormRef' :model='formData' class='authentication-form'>
          <el-form-item class='warning-input mb-4 rounded-md' prop='email' required>
            <div class='z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <div class='w-5 h-5'>
                <MailIcon class='w-5 h-5 text-gray-210' />
              </div>
            </div>
            <el-input v-model='formData.email' placeholder='Email' />
          </el-form-item>
          <el-form-item class='mb-6 rounded-md' prop='password' required>
            <div class='z-10 absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <div class='w-5 h-5'>
                <LockOpenIcon class='w-5 h-5 text-gray-210' />
              </div>
            </div>
            <el-input v-model='formData.password' placeholder='Password' type='password' />
          </el-form-item>
          <el-form-item class='mb-4'>
            <el-checkbox class='text-muted font-normal'>Nhớ mật khẩu</el-checkbox>
          </el-form-item>
        </el-form>
        <el-button type='primary' @click='submitForm(reportFormRef)'>Đăng nhập</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import useStore from 'store'
import { LockOpenIcon, MailIcon } from '@heroicons/vue/solid'
import { useAuthorizationTokenStore } from 'modules/auth/store/state'
import { login } from '../../../../services/auth/getAuth'
import { ElMessage, FormInstance } from 'element-plus'
import { AuthorizationToken } from 'modules/auth/store/types'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginForm',
  components: {
    MailIcon,
    LockOpenIcon,
  },
  props: {
    height: {
      type: Number,
    },
    description: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore()
    const authorizationTokenStore = useAuthorizationTokenStore()
    const form = ref<ElementForm>()
    const reportFormRef = ref<FormInstance>()
    const formData = ref({ email: props.email, password: props.password })
    const router = useRouter()

    const handleLogin = async () => {
      const response: AuthorizationToken = await login(formData.value.email, formData.value.password)
      if (response.access_token) {
        const { access_token, refresh_token, token_type } = response

        authorizationTokenStore.access_token = access_token
        authorizationTokenStore.refresh_token = refresh_token
        authorizationTokenStore.token_type = token_type

        ElMessage({
          message: 'Đăng nhập thành công',
          showClose: true,
          type: 'success',
        })
        setTimeout(() => {
          naiveLogin()
        }, 1500)
      } else {
        ElMessage({
          message: 'Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!',
          type: 'error',
        })
      }
    }

    const naiveLogin = async () => {
      try {
        if (!store.auth.isAuthenticated) {
          store.auth.actLogin(formData.value)
        }
      } catch (e) {
        console.log('err::: ', e)
      }
    }

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          handleLogin()
        } else {
          ElMessage({
            message: 'Vui lòng nhập đầy đủ thông tin yêu cầu để đăng nhập.',
            grouping: true,
            showClose: true,
            type: 'error',
          })
        }
      })
    }

    return {
      form,
      formData,
      reportFormRef,
      handleLogin,
      submitForm,
    }
  },
})
</script>

<style>
body .authentication-form .el-input .el-input__inner {
  box-shadow: none !important;
}
</style>
