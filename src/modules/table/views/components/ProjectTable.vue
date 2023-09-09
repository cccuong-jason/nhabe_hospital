<template>
  <div class='w-full'>
    <el-table ref='tableRef' :class='`is-${theme}`' :data='tableData' row-key='date' stripe style='width: 100%'
              height='70vh'>
      <el-table-column
        :filter-method='filterHandler'
        :filters=filterDateList
        column-key='date'
        fixed
        label='NGÀY TẠO'
        prop='date'
        sortable
        width='180'
      >
        <template #default='scope'>
          <div class='flex items-center'>
            <span class='pl-5 mb-0 text-0.875 font-semibold cursor-auto'>{{
                scope.row.created_at
              }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label='BÁO CÁO' min-width='280'>
        <template #default='scope'>
          <div class='flex items-center'>
            <span class='pl-5 mb-0 text-0.875 font-semibold cursor-auto'>{{
                scope.row.report
              }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :filter-method=filterHandler :filters=filterFormList column-key='form' label='LOẠI BÁO CÁO'
                       prop='form'
                       min-width='130'>
        <template #default='scope'>
          <div class='px-4 cursor-auto'>
            <span class='text-0.8125 font-normal'>{{ scope.row.form }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :filter-method='filterHandler' :filters=filterStatusList column-key='status' prop='status'
                       filter-placement='bottom-end'
                       label='TRẠNG THÁI'
                       min-width='167'>
        <template #default='scope'>
          <el-tag :type="
                  scope.row.status === 'từ chối'
                  ? 'danger'
                  : scope.row.status === 'đang xử lý'
                  ? 'warning'
                  : 'success'
              " effect='plain'>
            <div class='px-4 flex items-center'>
              <i
                :class="[
                  scope.row.status === 'từ chối'
                  ? 'bg-danger'
                  : scope.row.status === 'đang xử lý'
                  ? 'bg-warning'
                  : 'bg-success',
              ]"
                aria-hidden='true'
                class='w-2.5 h-2.5 rounded-full'
              ></i>
              <span class='ml-2 pb-0.5 text-0.875 font-normal'>{{ scope.row.status }}</span>
            </div>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :filter-method=filterHandler :filters='filterReporterList' column-key='reporter'
                       label='NGƯỜI BÁO CÁO'
                       prop='reporter'
                       min-width='155'>
        <template #default='scope'>
          <div class='px-4 flex items-center'>
            <div class='flex justify-center -space-x-3'>
              {{ scope.row.reporter_fullname }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed='right' label='THAO TÁC' width='200'>
        <template #default='scope'>
          <el-button plain link size='small' type='primary'
                     @click='openDetail(scope.row.report_reference, scope.row.id)'>Chi tiết
          </el-button
          >
          <el-button v-show="scope.row.form === 'Bắt buộc'" link size='small' type='primary' @click='openAnalyticForm'
                     plain>Tạo phân tích
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer v-model='isReportDetail' direction='rtl' size='50%'>
      <template #header>
        <h1>Báo cáo
          {{ reportStore.reportState.form === 'voluntary' ? reportStore.reportState.form === 'tự nguyện' : 'bắt buộc'
          }}</h1>
      </template>
      <template #default>
        <ReportDetail />
      </template>
      <template #footer>
        <div style='flex: auto'>
          <el-button plain size='large'>Từ chối</el-button>
          <el-button type='primary' size='large' plain>Xác nhận</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { DotsVerticalIcon } from '@heroicons/vue/outline'
import { ElLoading, TableColumnCtx, TableInstance } from 'element-plus'
import { ReportDashboard } from '../index.vue'
import { transformList } from 'utils/index'
import { useRouter } from 'vue-router'
import { useReportStore } from 'modules/reports/store/state'
import ReportDetail from 'modules/table/views/components/ReportDetail.vue'
import { getDetailReport, getListReport } from '../../../../services/reports/getReports'
import { ReportState } from 'modules/reports/store/types'

export default defineComponent({
  name: 'ProjectTable',
  methods: { useReportStore },
  components: {
    ReportDetail,
    DotsVerticalIcon,
  },
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'light',
    },
  },
  setup(props) {
    const theme = ref([
      { status: 'on schedule', color: '#11CDEF' },
      { status: 'delayed', color: '#F5365C' },
      { status: 'pending', color: '#FB6340' },
    ])
    const customColorMethod = (status: string) => {
      return theme.value.find((el: any) => el.status == status)?.color ?? '#2DCE89'
    }
    const router = useRouter()
    const tableRef = ref<TableInstance>()

    const clearFilter = () => {
      tableRef.value!.clearFilter()
    }

    const filterDateList = transformList(props.tableData, 'created_at')
    const filterStatusList = transformList(props.tableData, 'status')
    const filterFormList = transformList(props.tableData, 'form')
    const filterReporterList = transformList(props.tableData, 'reporter_fullname')

    const filterHandler = (
      value: string,
      row: ReportDashboard,
      column: TableColumnCtx<ReportDashboard>,
    ) => {
      const property = column['property']
      // @ts-ignore
      return row[property] === value
    }

    const openAnalyticForm = () => {
      const loading = ElLoading.service({
        lock: true,
        background: 'rgba(0, 0, 0, 0.7)',
      })

      setTimeout(() => {
        loading.close()
        router.push({ name: 'CreateReport', query: { reportForm: 'analytic' } })
      }, 1500)
    }

    // This will be dynamic
    const form = reactive({
      reportId: '12345',
      name: 'John Doe',
      form: 'voluntary',
      num_medical: '1234567890',
      gender: 'male',
      birthdate: '1990-01-01',
      subject_incident: ref(['client']),
      incident_location: 'Location',
      exact_location: 'Exact Location',
      issued_date: '2022-01-01',
      short_description: 'Short Description',
      proposal_solution: 'Proposal Solution',
      performed_treatment: 'Performed Treatment',
      is_informed: ref(['no']),
      is_recorded: ref(['yes']),
      is_family_noticed: ref(['no']),
      is_client_noticed: ref(['yes']),
      report: reactive({
        name: 'Reporter Name',
        phone: '1234567890',
        email: 'reporter@example.com',
      }),
      incident_classification: ref(['happen']),
      impact_classification: ref(['hard']),
      title: ref(['title1']),
      observer_1: 'Observer 1',
      observer_2: 'Observer 2',
      created_at: new Date(),
      updated_at: new Date(),
    })

    const isReportDetail = ref(false)
    const reportStore = useReportStore()
    const openDetail = async (report_reference: string, id: number) => {
      const data = await getDetailReport(report_reference, id)
      console.log('data', data)
      if (data.report) {
        reportStore.saveReportState(data.report)
      }

      isReportDetail.value = true
    }


    return {
      customColorMethod,
      filterDateList,
      filterStatusList,
      filterFormList,
      filterReporterList,
      clearFilter,
      filterHandler,
      openAnalyticForm,
      openDetail,
      isReportDetail,
      reportStore,
    }
  },
})
</script>
