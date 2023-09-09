<template>
  <el-scrollbar
    v-loading='isLoading'
    class='relative w-full bg-default overflow-y-auto h-screen '
  >
    <el-form v-if='isAnalytic' :model='form' class='report-section' label-position='top' label-width='7vw'>
      <el-row>
        <el-col :span='12'>
          <div class='content-center grid align-middle justify-center items-center w-1/2 fixed h-screen'>
            <span class='text-2xl font-black align-bottom text-white'>MẪU TÌM HIỂU VÀ PHÂN TÍCH SỰ CỐ</span>
            <span class='text-1.1 italic font-thin text-white'>(Ban hành kèm theo Quy trình số 01/QT-QLCL ngày 25/05/2020 của Bệnh viện huyện Nhà Bè)</span>
          </div>
        </el-col>
        <el-col :span='12'>
          <el-tabs v-model='analyticTab' class='mt-2' type='border-card'>
            <el-tab-pane label='A. Cấp nhân viên' name='employee'>
              <div class='p-4 rounded-md space-y-2 mt-5 mb-5'>
                <el-card>
                  <template #header>
                    <div class='card-header flex justify-between'>
                      <h1>
                        I. Mô tả chi tiết sự cố
                      </h1>
                      <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                        <el-input v-model='analyticForm.analysis_id' class='w-full' clearable
                                  placeholder='Số báo cáo' />
                      </div>
                    </div>
                  </template>
                  <div class='card-header-description mt-2'>
                    <el-form-item label='Mô tả chi tiết sự cố'>
                      <el-input v-model='analyticForm.treatment_executed' class='mt-4 mb-4'
                                placeholder='(Mô tả cả xử lý tức thời và hậu quả. Đối với loét tỳ đè, chỉ ra cụ thể vị trí, bên, phạm vi và tình trạng lúc nhập viện. Đối với sai sót về thuốc, liệt kê rõ tất cả thuốc (đính kèm thêm 1 tờ liệt kê nếu cần)'
                                type='textarea' />
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <div class='card-header flex justify-between'>
                      <h1>
                        II. Phân loại sự cố theo nhóm sự cố (Incident type)
                      </h1>
                    </div>
                  </template>
                  <div v-for='(incident, id) in finalIncidentTypeList' :key='incident'>
                    <el-form-item :label='`${id+1}. ${incident.title}`'>
                      <el-checkbox-group v-model='analyticForm.incident_type' :max='1' class='flex flex-col'>
                        <el-checkbox v-for='incident in incident.list' :label='incident' />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <h1>
                      III. Điều trị/y lệnh đã được thực hiện
                    </h1>
                  </template>
                  <div class='card-header-description mt-2'>
                    <el-form-item label='Điều trị/y lệnh đã được thực hiện'>
                      <el-input v-model='analyticForm.treatment_executed' class='mt-4 mb-4' type='textarea' />
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <div class='card-header flex justify-between'>
                      <h1>
                        IV. Phân loại sự cố theo nhóm nguyên nhân gây ra sự cố
                      </h1>
                    </div>
                  </template>
                  <div v-for='(incident, id) in finalReasonList' :key='incident'>
                    <el-form-item :label='`${id+1}. ${incident.title}`'>
                      <el-checkbox-group v-model='analyticForm.incident_reason' :max='1' class='flex flex-col'>
                        <el-checkbox v-for='incident in incident.list' :label='incident' />
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <h1>
                      V. Hành động khắc phục sự cố
                    </h1>
                  </template>
                  <div class='card-header-description mt-2'>
                    <el-form-item label='Mô tả hành động xử lý sự cố'>
                      <el-input v-model='analyticForm.solution_executed' class='mt-4 mb-4' type='textarea' />
                    </el-form-item>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <h1>
                      VI. Đề xuất khuyến cáo phòng ngừa sự cố
                    </h1>
                  </template>
                  <div class='card-header-description mt-2'>
                    <el-form-item label='Ghi đề xuất khuyến cáo phòng ngừa'>
                      <el-input v-model='analyticForm.solution_executed' class='mt-4 mb-4' type='textarea' />
                    </el-form-item>
                  </div>
                </el-card>
                <div class='flex justify-items-end'>
                  <el-form-item class='justify-end'>
                    <el-button type='primary' @click='handleAnalytic'>Tạo phân tích</el-button>
                    <el-button>Cancel</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label='B. Cấp quản lý' name='manager'>
              <div class='p-4 rounded-md space-y-2 mt-5 mb-5'>
                <el-card>
                  <template #header>
                    <div class='card-header flex justify-between'>
                      <h1>
                        I. Đánh giá của Trưởng nhóm chuyên gia
                      </h1>
                    </div>
                  </template>
                  <div class='card-header-description mt-2'>
                    <el-form-item label='Mô tả chi tiết sự cố'>
                      <el-input v-model='analyticForm.group_leader_evaluation' class='mt-4 mb-4'
                                placeholder='Mô tả kết quả phát hiện được (không lặp lại các mô tả sự cố)'
                                type='textarea' />
                    </el-form-item>
                    <el-row :gutter='10'>
                      <el-col :span='12'>
                        <el-card>
                          <template #header class='sp'>
                            <div class='card-header'>
                              <h3>
                                Đã thảo luận đưa khuyến cáo/hướng xử lý với người báo cáo
                              </h3>
                            </div>
                          </template>
                          <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                            <el-form-item>
                              <el-checkbox-group v-model='analyticForm.is_aligned_with_reporter' :max='1'>
                                <el-checkbox label='Có' />
                                <el-checkbox label='Không' />
                                <el-checkbox label='Không ghi nhận' />
                              </el-checkbox-group>
                            </el-form-item>
                          </div>
                        </el-card>
                      </el-col>
                      <el-col :span='12'>
                        <el-card>
                          <template #header class='sp'>
                            <div class='card-header'>
                              <h3>
                                Phù hợp với các khuyến cáo chính thức được ban hành Ghi cụ thể khuyến cáo:
                              </h3>
                            </div>
                          </template>
                          <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                            <el-form-item>
                              <el-checkbox-group v-model='analyticForm.is_accorded' :max='1'>
                                <el-checkbox label='Có' />
                                <el-checkbox label='Không' />
                                <el-checkbox label='Không ghi nhận' />
                              </el-checkbox-group>
                            </el-form-item>
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
                <el-card>
                  <template #header>
                    <div class='card-header flex justify-between'>
                      <h1>
                        II. Đánh giá mức độ tổn thương
                      </h1>
                    </div>
                  </template>
                  <el-row :gutter='20'>
                    <el-col :span='12'>
                      <el-form-item label='Trên người bệnh'>
                        <el-cascader-panel
                          v-model='analyticForm.client_level'
                          :options='clientLevelOptions'
                          class='mt-4 mb-4'
                          placeholder='Mức độ tổn thương của người bệnh' />
                      </el-form-item>
                    </el-col>
                    <el-col :offset='1' :span='11'>
                      <el-form-item label='Trên tổ chức'>
                        <el-checkbox-group v-model='analyticForm.organization_level' :max='1' class='flex flex-col'>
                          <el-checkbox v-for='level in organizationLevels' :label='level' />
                        </el-checkbox-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter='10'>
                    <el-col :span='12'>
                      <el-form-item label='Họ và tên'>
                        <el-input v-model='analyticForm.reported.name' />
                      </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                      <el-form-item label='Chức danh'>
                        <el-input v-model='analyticForm.reported.title'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row class='justify-between'>
                    <span class='self-center'>Báo cáo được tao vào lúc <span class='font-bold'>{{ currentTime }}</span></span>
                    <el-form-item class='w-1/2'>
                      <el-input v-model='analyticForm.reported.signature' clearable placeholder='Kí tên'></el-input>
                    </el-form-item>
                  </el-row>
                </el-card>
                <el-divider></el-divider>
                <div class='flex justify-items-end'>
                  <el-form-item class='justify-end'>
                    <el-button type='primary' @click='onSubmit'>Tạo phân tích</el-button>
                    <el-button>Cancel</el-button>
                  </el-form-item>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
    <el-form
      v-else
      ref='reportFormRef'
      :model='form'
      class='report-section'
      hide-required-asterisk
      label-position='top'
      label-width='7vw'
      scroll-to-error>
      <el-row>
        <el-col :span='12'>
          <div class='content-center grid align-middle justify-center items-center w-1/2 fixed h-screen'>
            <span class='text-2xl font-black align-bottom text-white'>MẪU BÁO CÁO SỰ CỐ Y KHOA</span>
            <span class='text-1.1 italic font-thin text-white'>(Ban hành kèm theo Quy trình số 01/QT-QLCL ngày 25/05/2020
              của
              Bệnh viện huyện Nhà Bè)
            </span>
            <el-alert
              :closable='false'
              class='mt-2'
              effect='light'
              show-icon
              title='Vui lòng điền đầy đủ các thông tin để tạo báo cáo'
              type='warning'
            />
          </div>
        </el-col>
        <el-col :span='12'>
          <div class='p-4 rounded-md space-y-2 mt-5 mb-5'>
            <el-card class='report-card'>
              <template #header>
                <div class='card-header flex'>
                  <h1 class='w-2/4'>
                    Thông tin người bệnh
                  </h1>
                  <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                    <el-form-item prop='report_reference' required>
                      <el-input v-model='form.report_reference' class='w-full' clearable placeholder='Số báo cáo' />
                    </el-form-item>
                    <el-form-item prop='client_medical_record_id' required>
                      <el-input v-model='form.client_medical_record_id' class='w-full' clearable
                                placeholder='Số bệnh án' />
                    </el-form-item>
                  </div>
                </div>
              </template>
              <el-row :gutter='20'>
                <el-col :span='12'>
                  <el-form-item label='Họ và tên' prop='client_fullname' required>
                    <el-input
                      v-model='form.client_fullname'
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label='Giới tính' prop='client_gender' required>
                    <el-select v-model='form.client_gender' placeholder='Vui lòng chọn giới tính'>
                      <el-option label='Nam' value='male' />
                      <el-option label='Nữ' value='female' />
                      <el-option label='Khác' value='other' />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label='Ngày sinh' prop='client_birthdate' required>
                    <el-date-picker
                      v-model='form.client_birthdate'
                      format='DD/MM/YYYY'
                      type='date'
                      @change='convertToUTC'
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label='Đối tượng xảy ra sự cố' prop='incident_subject' required>
                <el-checkbox-group v-model='form.incident_subject' :max='1'>
                  <el-checkbox label='Người bệnh' />
                  <el-checkbox label='Người nhà/khách đến thăm' />
                  <el-checkbox label='Nhân viên y tế' />
                  <el-checkbox label='Trang thiết bị/cơ sở hạ tầng' />
                </el-checkbox-group>
              </el-form-item>
            </el-card>
            <el-card class='report-card'>
              <template #header>
                <div class='card-header'>
                  <h1>
                    Thông tin người báo cáo
                  </h1>
                </div>
              </template>
              <el-row :gutter='20'>
                <el-col :span='12'>
                  <el-form-item label='Họ và tên' prop='reporter_fullname' required>
                    <el-input v-model='form.reporter_fullname' />
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label='Số điện thoại' prop='reporter_phone' required>
                    <el-input v-model='form.reporter_phone' type='number'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span='6'>
                  <el-form-item label='Email' prop='reporter_email' required>
                    <el-input v-model='form.reporter_email' type='text'></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item label='Chức danh' prop='title' required>
                  <el-checkbox-group v-model='form.title' :max='1'>
                    <el-checkbox label='Điều dưỡng' />
                    <el-checkbox label='Bác sĩ' />
                    <el-checkbox label='Người bệnh' />
                    <el-checkbox label='Người nhà/khách đến thăm' />
                    <el-checkbox label='Khác' />
                  </el-checkbox-group>
                </el-form-item>
              </el-row>
              <el-row class='flex space-x-4'>
                <el-form-item class='w-1/3' label='Người chứng kiến 1' prop='observer_1' required>
                  <el-input v-model='form.observer_1'></el-input>
                </el-form-item>
                <el-form-item class='w-1/3' label='Người chứng kiến 2' prop='observer_2' required>
                  <el-input v-model='form.observer_2'></el-input>
                </el-form-item>
              </el-row>
            </el-card>
            <el-card class='report-card'>
              <template #header>
                <div class='card-header flex'>
                  <h1 class='w-2/3'>
                    Nơi xảy ra sự cố
                  </h1>
                  <div class='flex flex-row-reverse space-x-4 space-x-reverse w-2/3'>
                    <el-form-item prop='issued_date' required>
                      <el-date-picker
                        v-model='form.issued_date'
                        placeholder='Ngày giờ xảy ra sự cố'
                        type='datetime'
                        @change='convertToUTC'
                      />
                    </el-form-item>
                  </div>
                </div>
              </template>
              <el-row :gutter='20'>
                <el-col :span='12'>
                  <el-form-item label='Khoa/phòng/vị trí xảy ra sự cố' prop='incident_location' required>
                    <el-input v-model='form.incident_location' :rows='3'
                              class='mt-4 mb-4'
                              placeholder='Ví dụ: khoa ICU, khuôn viên bệnh viện'
                              type='textarea' />
                  </el-form-item>
                  <el-form-item label='Mô tả ngắn gọn về sự cố' prop='short_description' required>
                    <el-input v-model='form.short_description' :rows='3' class='mt-4 mb-4' type='textarea' />
                  </el-form-item>
                  <el-form-item label='Điều trị/xử lí ban đầu đã được thực hiện' prop='performed_treatment' required>
                    <el-input v-model='form.performed_treatment' :rows='3' class='mt-4 mb-4' type='textarea' />
                  </el-form-item>
                </el-col>
                <el-col :span='12'>
                  <el-form-item label='Vị trí cụ thể' prop='exact_location' required>
                    <el-input v-model='form.exact_location' :rows='3'
                              class='mt-4 mb-4'
                              placeholder='ví dụ: nhà vệ sinh, bãi đậu xe....'
                              type='textarea' />
                  </el-form-item>
                  <el-form-item label='Đề xuất giải pháp ban đầu' prop='proposal_solution' required>
                    <el-input v-model='form.proposal_solution' :rows='3' class='mt-4 mb-4' type='textarea' />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
            <el-card class='report-card'>
              <el-row :gutter='10'>
                <el-col :span='12'>
                  <el-card>
                    <template #header class='sp'>
                      <div class='card-header'>
                        <h3>
                          Phân loại ban đầu về sự cố
                        </h3>
                      </div>
                    </template>
                    <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                      <el-form-item prop='incident_classification' required>
                        <el-checkbox-group v-model='form.incident_classification' :max='1'>
                          <el-checkbox label='Chưa xảy ra' />
                          <el-checkbox label='Đã xảy ra' />
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class='mt-2'>
                    <template #header class='sp'>
                      <div class='card-header'>
                        <h3>
                          Thông báo cho người nhà/người bảo hộ
                        </h3>
                      </div>
                    </template>
                    <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                      <el-form-item prop='is_family_noticed' required>
                        <el-checkbox-group v-model='form.is_family_noticed' :max='1'>
                          <el-checkbox label='Có' />
                          <el-checkbox label='Không' />
                          <el-checkbox label='Không ghi nhận' />
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class='mt-2'>
                    <template #header class='sp'>
                      <div class='card-header'>
                        <h3>
                          Thông báo cho Bác sĩ điều trị/người có trách nhiệm
                        </h3>

                      </div>
                    </template>
                    <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                      <el-form-item prop='is_informed' required>
                        <el-checkbox-group v-model='form.is_informed' :max='1'>
                          <el-checkbox label='Có' />
                          <el-checkbox label='Không' />
                          <el-checkbox label='Không ghi nhận' />
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span='12'>
                  <el-card>
                    <template #header class='sp'>
                      <div class='card-header'>
                        <h3>
                          Ghi nhận vào hồ sơ bệnh án/giấy tờ liên quan
                        </h3>
                      </div>
                    </template>
                    <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                      <el-form-item prop='is_recorded' required>
                        <el-checkbox-group v-model='form.is_recorded' :max='1'>
                          <el-checkbox label='Có' />
                          <el-checkbox label='Không' />
                          <el-checkbox label='Không ghi nhận' />
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class='mt-2'>
                    <template #header class='sp'>
                      <div class='card-header'>
                        <h3>
                          Thông báo cho người bệnh
                        </h3>
                      </div>
                    </template>
                    <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                      <el-form-item prop='is_client_noticed' required>
                        <el-checkbox-group v-model='form.is_client_noticed' :max='1'>
                          <el-checkbox label='Có' />
                          <el-checkbox label='Không' />
                          <el-checkbox label='Không ghi nhận' />
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                  <el-card class='mt-2'>
                    <template #header class='sp'>
                      <div class='card-header'>
                        <h3>
                          Đánh giá ban đầu về mức độ ảnh hưởng của sự cố
                        </h3>
                      </div>
                    </template>
                    <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                      <el-form-item prop='impact_assessment' required>
                        <el-checkbox-group v-model='form.impact_assessment' :max='1'>
                          <el-checkbox label='Nặng' />
                          <el-checkbox label='Trung bình' />
                          <el-checkbox label='nhẹ' />
                        </el-checkbox-group>
                      </el-form-item>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-card>

            <div class='flex justify-items-end'>
              <el-form-item class='justify-end'>
                <el-button type='primary' @click='submitForm(reportFormRef)'>Tạo báo cáo</el-button>
                <el-button @click='resetForm(reportFormRef)'>Khôi phục</el-button>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </el-scrollbar>
</template>

<script lang='ts' setup>
import cloneDeep from 'lodash.clonedeep'
import { computed, markRaw, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { convertToUTC } from 'utils/index'
import dayjs from 'dayjs'
import { Download } from '@element-plus/icons-vue'
import { createReport } from '../../../../services/reports/getReports'
import { PDFDocument, StandardFonts } from 'pdf-lib'

import download from 'downloadjs'
import BM01 from '@/assets/fillable_pdf/BM01.pdf'

const router = useRoute()
const isAnalytic = computed(() => router.query.reportForm === 'analytic')
const medicalIssue = computed(() => router.query.medicalIssue.toString())
const analyticTab = ref('employee')
const reportFormRef = ref<FormInstance>()
const isLoading = ref(false)


const analyticForm = reactive(
  {
    analysis_id: '',
    detailed_description: '',
    incident_type: ref([]),
    treatment_executed: '',
    incident_reason: ref([]),
    solution_executed: '',
    recommendation_incident_prevention: '',
    group_leader_evaluation: '',
    is_aligned_with_reporter: '',
    is_accorded: '',
    client_level: '',
    organization_level: ref([]),
    reported: reactive({
      name: '',
      title: '',
      signature: '',
    }),
    created_at: new Date(),
  },
)

const form = reactive({
  form: router.query.reportType == 'voluntary' ? 'is_voluntary' : 'is_required',
  report_reference: '',
  client_fullname: '',
  client_medical_record_id: '',
  client_gender: '',
  client_birthdate: '',
  incident_subject: ref([]),
  incident_location: '',
  exact_location: '',
  issued_date: '',
  short_description: '',
  proposal_solution: '',
  performed_treatment: '',
  is_informed: ref([]),
  is_recorded: ref([]),
  is_family_noticed: ref([]),
  is_client_noticed: ref([]),
  reporter_fullname: '',
  reporter_phone: '',
  reporter_email: '',
  incident_classification: ref([]),
  impact_assessment: ref([]),
  title: ref([]),
  observer_1: '',
  observer_2: '',
  created_at: dayjs.utc(new Date()).local(),
  updated_at: dayjs.utc(new Date()).local(),
})

// onMounted(() => {
//   //@ts-ignore
//   form.short_description = medicalIssue
// })

const technicalProcess = [
  'Không có sự đồng ý của người bệnh/người nhà (đối với những kỹ thuật, thủ thuật quy định phải ký cam kết)',
  'Không thực hiện khi có chỉ định',
  'Thực hiện sai người bệnh',
  'Thực hiện sai thủ thuật/quy trình/ phương pháp điều trị',
  'Thực hiện sai vị trí phẫu thuật/thủ thuật',
  'Bỏ sót dụng cụ, vật tư tiêu hao trong quá trình phẫu thuật',
  'Tử vong trong thai kỳ',
  'Tử vong khi sinh',
  'Tử vong sơ sinh',
]

const hospitalInfections = [
  'Nhiễm khuẩn huyết',
  'Viêm phổi',
  'Nhiễm khuẩn vết mổ',
  'Nhiễm khuẩn tiết niệu',
  'Các loại nhiễm khuẩn khác',
]

const medicinesAndFluids = [
  'Cấp phát sai thuốc, dịch truyền',
  'Thiếu thuốc',
  'Sai liều, sai hàm lượng',
  'Sai thời gian',
  'Sai y lệnh',
  'Bỏ sót thuốc/liều thuốc',
  'Sai thuốc',
  'Sai người bệnh',
  'Sai đường dùng',
]

const BloodAndBloodProducts = [
  'Phản ứng phụ, tai biến khi truyền máu',
  'Truyền nhầm máu, chế phẩm máu',
  'Truyền sai liều, sai thời điểm',
]

const medicalDevices = [
  'Thiếu thông tin hướng dẫn sử dụng',
  'Lỗi thiết bị',
  'Thiết bị thiếu hoặc không phù hợp',
]

const behaviorList = [
  'Khuynh hướng tự gây hại, tự tử',
  'Quấy rối tình dục bởi nhân viên',
  'Quấy rối tình dục bởi người bệnh/ khách đến thăm',
  'Xâm hại cơ thể bởi người bệnh/khách đến thăm',
  'Có hành động tự tử',
  'Trốn viện',
]

const clientAccidents = [
  'Té ngã',
]

const infrastructure = [
  'Bị hư hỏng, bị lỗi',
  'Thiếu hoặc không phù hợp',
]

const resourceManagement = [
  'Tính phù hợp, đầy đủ của dịch vụ khám bệnh, chữa bệnh',
  'Tính phù hợp, đầy đủ của nguồn lực',
  'Tính phù hợp, đầy đủ của chính sách, quy định, quy trình, hướng dẫn chuyên môn',
]

const documents = [
  'Tài liệu mất hoặc thiếu',
  'Tài liệu không rõ ràng, không hoàn chỉnh',
  'Thời gian chờ đợi kéo dài',
  'Cung cấp hồ sơ tài liệu chậm',
  'Nhầm hồ sơ tài liệu',
  'Thủ tục hành chính phức tạp',
]

const others = [
  'Các sự cố không đề cập trong các mục từ 1 đến 10',
]

const finalIncidentTypeList = ref([
  {
    id: 1,
    title: 'Thực hiện quy trình kỹ thuật, thủ thuật chuyên môn',
    list: technicalProcess,
  },
  {
    id: 2,
    title: 'Nhiễm khuẩn bệnh viện',
    list: hospitalInfections,
  },
  {
    id: 3,
    title: 'Thuốc và dịch truyền',
    list: medicinesAndFluids,
  },
  {
    id: 4,
    title: 'Máu và các chế phẩm máu',
    list: BloodAndBloodProducts,
  },
  {
    id: 5,
    title: 'Thiết bị y tế',
    list: medicalDevices,
  },
  {
    id: 6,
    title: 'Hành vi',
    list: behaviorList,
  },
  {
    id: 7,
    title: 'Tai nạn đối với người bệnh',
    list: clientAccidents,
  },
  {
    id: 8,
    title: 'Hạ tầng cơ sở',
    list: infrastructure,
  },
  {
    id: 9,
    title: 'Quản lý nguồn lực, tổ chức',
    list: resourceManagement,
  },
  {
    id: 10,
    title: 'Hồ sơ, tài liệu, thủ tục hành chính',
    list: documents,
  },
  {
    id: 11,
    title: 'Khác',
    list: others,
  },
])

const employees = [
  'Nhận thức (kiến thức, hiểu biết, quan niệm)',
  'Thực hành (kỹ năng thực hành không đúng quy định, hướng dẫn chuẩn hoặc thực hành theo quy định, hướng dẫn sai)',
  'Thái độ, hành vi, cảm xúc',
  'Giao tiếp',
  'Tâm sinh lý, thể chất, bệnh lý',
  'Các yếu tố xã hội',
]

const clients = [
  'Nhận thức (kiến thức, hiểu biết, quan niệm) - Người bệnh',
  'Thực hành (kỹ năng thực hành không đúng quy định, hướng dẫn chuẩn hoặc thực hành theo quy định, hướng dẫn sai) - Người bệnh',
  'Thái độ, hành vi, cảm xúc - Người bệnh',
  'Giao tiếp - Người bệnh',
  'Tâm sinh lý, thể chất, bệnh lý - Người bệnh',
  'Các yếu tố xã hội - Người bệnh',
]

const environment = [
  'Cơ sở vật chất, hạ tầng, trang thiết bị',
  'Khoảng cách đến nơi làm việc quá xa',
  'Đánh giá về độ an toàn, các nguy cơ rủi ro của môi trường làm việc',
  'Nội quy, quy định và đặc tính kỹ thuật',
]

const organizationService = [
  'Các chính sách, quy trình, hướng dẫn chuyên môn',
  'Tuân thủ quy trình thực hành chuẩn',
  'Văn hóa tổ chức',
  'Làm việc nhóm',
]

const outsider = [
  'Môi trường tự nhiên',
  'Sản phẩm, công nghệ và cơ sở hạ tầng',
  'Quy trình, hệ thống dịch vụ',
]

const reasonOthers = [
  'Các yếu tố không đề cập trong các mục từ 1 đến 5',
]

const finalReasonList = ref([
  {
    id: 1,
    title: 'Nhân viên',
    list: employees,
  },
  {
    id: 2,
    title: 'Người bệnh',
    list: clients,
  },
  {
    id: 3,
    title: 'Môi trường làm việc',
    list: environment,
  },
  {
    id: 4,
    title: 'Tổ chức, dịch vụ',
    list: organizationService,
  },
  {
    id: 5,
    title: 'Yếu tố Bên ngoài',
    list: outsider,
  },
  {
    id: 6,
    title: 'Khác',
    list: reasonOthers,
  },
])

const clientLevelOptions = [
  {
    value: 'nc0',
    label: '1. Chưa xảy ra (NC0)',
    children: [
      {
        value: 'A',
        label: 'A',
      },
    ],
  },
  {
    value: 'nc1',
    label: '2. Tổn thương nhẹ (NC1)',
    children: [
      {
        value: 'B',
        label: 'B',
      },
      {
        value: 'C',
        label: 'C',
      },
      {
        value: 'D',
        label: 'D',
      },
    ],
  },
  {
    value: 'nc2',
    label: 'Tổn thương trung bình (NC2)',
    children: [
      {
        value: 'E',
        label: 'E',
      },
      {
        value: 'F',
        label: 'F',
      },
    ],
  },
  {
    value: 'nc3',
    label: 'Tổn thương nặng (NC3)',
    children: [
      {
        value: 'G',
        label: 'G',
      },
      {
        value: 'H',
        label: 'H',
      },
      {
        value: 'I',
        label: 'I',
      },
    ],
  },
]

const organizationLevels = [
  'Tổn hại tài sản',
  'Tăng nguồn lực phục vụ cho người bệnh',
  'Quan tâm của truyền thông',
  'Khiếu nại của người bệnh',
  'Tổn hại danh tiếng',
  'Can thiệp của pháp luật',
  'Khác',
]

const currentTime = ref('')

// Function to update the current time
const updateCurrentTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString()
}

// Call the updateCurrentTime function on component mount
onMounted(() => {
  // Update the time every second
  setInterval(updateCurrentTime, 1000)
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {

      const copyForm = cloneDeep(form)

      for (const key in form) {
        //@ts-ignore
        if (Array.isArray(form[key])) {
          //@ts-ignore
          form[key] = form[key][0]
        }

        if (['is_informed', 'is_recorded', 'is_family_noticed', 'is_client_noticed'].includes(key)) {
          const boolean_mapping = {
            'Có': 'yes',
            'Không': 'no',
            'Không ghi nhận': 'not_acknowledged',
          }
          mapValue(copyForm, key, boolean_mapping)
        }

        if (key == 'incident_classification') {
          const incident_classification_mapping = {
            'Chưa xảy ra': 'not_happen',
            'Đã xảy ra': 'happen',
          }
          mapValue(copyForm, key, incident_classification_mapping)
        }

        if (key == 'incident_subject') {
          const incident_subject_mapping = {
            'Người bệnh': 'client',
            'Người nhà/khách đến thăm': 'visitor',
            'Nhân viên y tế': 'staff',
            'Trang thiết bị/cơ sở hạ tầng': 'infrastructure',
          }
          //@ts-ignore
          mapValue(copyForm, key, incident_subject_mapping)
        }

        if (key == 'impact_assessment') {
          const impact_assessment_mapping = {
            'Nặng': 'hard',
            'Trung bình': 'medium',
            'Nhẹ': 'light',
          }
          mapValue(copyForm, key, impact_assessment_mapping)
        }

        if (key == 'title') {
          const title_mapping = {
            'Điều dưỡng': 'nurse',
            'Bác sĩ': 'doctor',
            'Người bệnh': 'client',
            'Người nhà/khách đến thăm': 'visitor',
            'Khác': 'other',
          }
          mapValue(copyForm, key, title_mapping)
        }
      }

      const payload = JSON.stringify(copyForm)

      console.log(payload)

      const loading = ElLoading.service({
        lock: true,
        text: 'Báo cáo đang được tạo và gửi đi',
        background: 'rgba(0, 0, 0, 0.7)',
      })

      createReport(JSON.parse(payload)).then((response) => {
        if (!response.report) {
          ElMessage({
            message: 'Có lỗi xảy ra, vui lòng thử lại sau',
            type: 'error',
          })
        } else {
          loading.close()
          formEl.resetFields()
          ElMessageBox.confirm(
            'Báo cáo của bạn đã được tạo và gửi đi. Bạn có muốn tải file pdf không?',
            'Thành công',
            {
              confirmButtonText: 'Tải pdf',
              cancelButtonText: 'Hủy',
              type: 'success',
              icon: markRaw(Download),
            },
          )
            .then(() => {
              fillPDFForm(copyForm)
              ElMessage({
                type: 'success',
                message: 'Tải về thành công',
              })
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: 'Hủy tải về',
              })
            })
        }
      })

    } else {
      ElMessage({
        message: 'Vui lòng hoàn thiện các thông tin yêu cầu để tiếp tục.',
        grouping: true,
        showClose: true,
        type: 'error',
      })
    }
  })
}


const mapValue = (form: any, key: string, mapping: any) => {
  form[key] = mapping[form[key]].normalize('NFC')
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const fillPDFForm = async (copyForm) => {
  const formType = router.query.reportType == 'voluntary' ? 'is_voluntary' : 'is_required'


  const created_at = dayjs(copyForm.created_at)
  const issued_day = dayjs(copyForm.issued_date)

  const created_day = created_at.date()
  const created_month = created_at.month() + 1 // Months are zero-based, so we add 1
  const created_year = created_at.year()

  const issued_date = issued_day.date()
  const issued_month = issued_day.month() + 1 // Months are zero-based, so we add 1
  const issued_year = issued_day.year()

  const hours = issued_day.format('HH')
  const minutes = issued_day.format('mm')
  const seconds = issued_day.format('ss')


  const normalMappingToPdf = {
    'report_id': copyForm.report_reference,
    'unit': copyForm.unit,
    'client_fullname': copyForm.client_fullname,
    'client_medical_record_id': copyForm.client_medical_record_id,
    'client_birthdate': dayjs(copyForm.client_birthdate).format('DD/MM/YYYY'),
    'client_gender': copyForm.client_gender,
    'department': copyForm.department,
    'created_day': created_day.toString(),
    'created_month': created_month.toString(),
    'created_year': created_year.toString(),
    'issued_date': issued_date.toString(),
    'issued_month': issued_month.toString(),
    'issued_year': issued_year.toString(),
    'issued_time': `${hours}:${minutes}:${seconds}`,
    'incident_location': copyForm.incident_location,
    'exact_location': copyForm.exact_location,
    'short_description': copyForm.short_description,
    'proposal_solution': copyForm.proposal_solution,
    'performed_treatment': copyForm.performed_treatment,
    'reporter_name': copyForm.reporter_fullname,
    'reporter_phone': copyForm.reporter_phone,
    'reporter_email': copyForm.reporter_email,
    'observer_1': copyForm.observer_1,
    'observer_2': copyForm.observer_2,
  }

  const pdfBytes = await fetch(BM01).then((res) => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(pdfBytes)
  const pdfForm = pdfDoc.getForm()
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  pdfForm.updateFieldAppearances(timesRomanBold)


  // Handle form type
  if (formType == 'is_voluntary') {
    const formCheckbox = pdfForm.getCheckBox('voluntary_form')
    formCheckbox.check()
  } else {
    const formCheckbox = pdfForm.getCheckBox('compulsory_form')
    formCheckbox.check()
  }

  // Handle incident subject
  for (const key of ['client_incident_subject', 'visitor_incident_subject', 'staff_incident_subject'].values()) {
    //@ts-ignore
    if (pdfForm.getCheckBox(key) && key.includes(copyForm['incident_subject'])) {
      pdfForm.getCheckBox(key).check()
    }
  }

  for (const key of ['yes_is_informed', 'no_is_informed', 'no_acknowledged'].values()) {
    //@ts-ignore
    if (pdfForm.getCheckBox(key) && key.includes(copyForm['is_informed'])) {
      pdfForm.getCheckBox(key).check()
    }
  }

  // for (const key of ['yes_is_client_informed', 'no_is_client_informed', 'no_acknowledged_client_noticed'].values()) {
  //   //@ts-ignore
  //   if (pdfForm.getCheckBox(key) && key.includes(copyForm['is_client_informed'])) {
  //     pdfForm.getCheckBox(key).check()
  //   }
  // }

  for (const key of ['yes_is_family_noticed', 'no_is_family_noticed', 'no_acknowledged_family_noticed'].values()) {
    //@ts-ignore
    if (pdfForm.getCheckBox(key) && key.includes(copyForm['is_family_noticed'])) {
      pdfForm.getCheckBox(key).check()
    }
  }

  for (const key of ['nursing_title', 'client_title', 'visitor_title', 'doctor_title', 'other_title'].values()) {
    //@ts-ignore
    if (pdfForm.getCheckBox(key) && key.includes(copyForm['title'])) {
      pdfForm.getCheckBox(key).check()
    }
  }


  // Handle incident classification
  for (const key of ['not_happen_incident_classification', 'happen_incident_classification'].values()) {
    //@ts-ignore
    if (pdfForm.getCheckBox(key) && key.includes(copyForm['incident_classification'])) {
      pdfForm.getCheckBox(key).check()
    }
  }

  // Handle impact assessment
  for (const key of ['light_impact_assessment', 'medium_impact_assessment', 'hard_impact_assessment'].values()) {
    //@ts-ignore
    if (pdfForm.getCheckBox(key) && key.includes(copyForm['impact_assessment'])) {
      pdfForm.getCheckBox(key).check()
    }
  }

  // Handle client noticed
  for (const key of ['yes_is_client_noticed', 'no_is_client_noticed', 'no_acknowledged_client_noticed'].values()) {
    //@ts-ignore
    if (pdfForm.getCheckBox(key) && key.includes(copyForm['is_client_noticed'])) {
      pdfForm.getCheckBox(key).check()
    }
  }

  // Handle is recorded
  // for (const key of ['yes_is_recorded', 'no_is_recorded', 'no_acknowledged_is_recorded'].values()) {
  //   //@ts-ignore
  //   if (pdfForm.getCheckBox(key) && key.includes(copyForm['is_recorded'])) {
  //     pdfForm.getCheckBox(key).check()
  //   }
  // }

  for (const key in normalMappingToPdf) {
    //@ts-ignore
    pdfForm.getTextField(key).setText(normalMappingToPdf[key])
    pdfForm.getTextField(key).setFontSize(13)
  }

  pdfForm.flatten()
  const modifiedPdfBytes = await pdfDoc.save()

  download(modifiedPdfBytes, `nhabe_baocao_${created_day}${created_month}${created_year}.pdf`, 'application/pdf')
}

const handleAnalytic = () => {
  isLoading.value = true
  setTimeout(() => {
    ElMessage({
      message: 'Báo cáo đã được tạo thành công',
      grouping: true,
      showClose: true,
      type: 'success',
    })
    isLoading.value = false
  }, 1000)

}

</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
  -moz-appearance: textfield; /* Firefox */
}

body .el-input__inner {
  height: -webkit-fill-available !important;
}
</style>
