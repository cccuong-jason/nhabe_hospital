<template>
  <div class='instruction-page flex items-center justify-center h-screen'>
    <el-space direction='vertical'>
      <span
        class='text-2xl font-black align-bottom mt-5'>Chào mừng đến với hệ thống báo cáo y khoa của Bệnh viện Nhà Bè</span>
      <span class='text-1.1 italic font-thin'>Vui lòng chọn tạo báo cáo hoặc truy cập bảng điều khiển (chỉ dành cho nhân viên bệnh viện)</span>
      <el-row :gutter='20' class='mt-5'>
        <el-col :span='12'>
          <el-card class='box-card'>
            <template #header>
              <div class='card-header'>
                <img
                  :src='NhaBeHospitalReport'
                  alt='nhabe_create_image'
                  class='image'
                  height='300'
                  width='500' />
              </div>
            </template>
            <template #default>
              <div class='text-center'>
                <el-button bg class='text-1.5 font-medium w-full' size='large' text @click='$router.push("/reports")'>
                  Tạo báo cáo
                </el-button>
              </div>
            </template>
          </el-card>
        </el-col>
        <el-col :span='12'>
          <el-card class='box-card'>
            <template #header>
              <div class='card-header'>
                <img
                  :src='NhaBeHospitalDashboard'
                  alt='nhabe_dashboard_image'
                  class='image'
                  height='300'
                  width='500' />
              </div>
            </template>
            <template #default>
              <div class='text-center'>
                <el-button bg class='text-1.5 font-medium w-full' size='large' text type='success'
                           @click='$router.push("/dashboard")'>Truy cập bảng điều
                  khiển
                </el-button>
              </div>
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-space>
  </div>
</template>

<script>
import NhaBeHospitalReport from '@/assets/images/nhabe_report_create.png'
import NhaBeHospitalDashboard from '@/assets/images/nhabe_report_dashboard.png'

export default {
  name: 'HomePage',
  setup() {
    return {
      NhaBeHospitalReport,
      NhaBeHospitalDashboard,
    }
  },
}
</script>
