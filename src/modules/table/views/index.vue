<template>
  <div class='w-full block mx-auto h-auto py-2'>
    <div class='flex flex-wrap flex-col bg-white shadow mb-7 mx-auto rounded-md'>
      <div class='py-5 px-6 border-b border-primary-white'>
        <h3 class='cursor-auto'>BÁO CÁO Y KHOA</h3>
      </div>
      <div class='block overflow-x-auto w-full'>
        <ProjectTable :tableData='tableData' />
      </div>
      <div class='p-4'>
        <Pagination />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'

import ProjectTable from './components/ProjectTable.vue'
import Pagination from 'components/Pagination/index.vue'
import { getListReport, getNewAccessToken, ReportListResponse } from '../../../services/reports/getReports'
import { ReportState } from 'modules/reports/store/types'
import { useAuthorizationTokenStore, useReportResponse } from 'modules/auth/store/state'
import { useReportStore } from 'modules/reports/store/state'

export interface ReportDashboard {
  id: number,
  created_at: Date,
  report: string
  form: string
  status: string
  reporter_fullname: string
}

export default defineComponent({
  name: 'Tables',
  components: {
    Pagination,
    ProjectTable,
  },
  setup() {
    let tableData = ref<ReportDashboard[]>([])
    onMounted(async () => {
      // Perform actions when the component is mounted
      const responseStore = useReportResponse()
      const responseData = await getListReport()
      if (responseData.reports) {
        responseStore.setReportResponse(responseData)
        tableData.value = mapReportStateArrayToDashboard(responseData.reports)
      } else {
        const authorizationTokenStore = useAuthorizationTokenStore()
        const responseData = await getNewAccessToken(authorizationTokenStore.refresh_token)
        // tableData = mapReportStateArrayToDashboard(responseData.reports)
        window.location.reload()
      }
    })

    function mapReportStateArrayToDashboard(reportStates: ReportState[]): ReportDashboard[] {
      return reportStates.map((reportState) => {
        const { id, report_reference, is_required, created_at, status, reporter_fullname } = reportState

        const reportDashboard: ReportDashboard = {
          id,
          created_at,
          report: `Báo cáo số ${report_reference}`,
          form: is_required === 'is_required' ? 'Bắt buộc' : 'Tự nguyện',
          status,
          reporter_fullname,
        }

        return reportDashboard
      })
    }

    return {
      tableData,
    }
  },
})
</script>
