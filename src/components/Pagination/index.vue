<template>
  <div class='w-full'>
    <div class='flex justify-end mb-0'>
      <el-pagination
        v-model:current-page='currentPage1'
        v-model:page-size='pageSize4'
        :page-sizes='[15]'
        :small='small'
        :disabled='disabled'
        :background='background'
        layout='total, sizes, prev, pager, next, jumper'
        :total='total_objects'
        @current-change='handleCurrentChange'
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { useReportResponse } from 'modules/auth/store/state'
import { getListReport } from '../../services/reports/getReports'

const responseStore = useReportResponse()
const total_objects = ref(0)
total_objects.value = responseStore.total_objects

const currentPage1 = ref(1)
currentPage1.value = responseStore.current_page

const pageSize4 = ref(15)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleCurrentChange = async (val: number) => {
  console.log(`current page: ${val}`)
  const responseStore = useReportResponse()
  const responseData = await getListReport()
  if (responseData.reports) {
    responseStore.setReportResponse(responseData)
  }
}
</script>
