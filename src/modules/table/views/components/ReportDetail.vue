<template>
  <el-row>
    <div class='bg-gray-200 p-4 rounded-md space-y-2 mt-5 mb-5'>
      <el-card class='report-card'>
        <template #header>
          <div class='card-header flex'>
            <h2 class='w-2/4'>
              Thông tin người bệnh
            </h2>
          </div>
        </template>
        <el-row :gutter='20'>
          <el-descriptions
            :column='3'
            border
            direction='horizontal'
            size='large'
          >
            <el-descriptions-item :span='1' label='Số bệnh án'><span
              class='font-bold'>{{ reportStoreState.client_medical_record_id }}</span>
            </el-descriptions-item>
            <el-descriptions-item label='Mã báo cáo'><span
              class='font-bold'>{{ reportStoreState.report_reference }}</span></el-descriptions-item>
            <el-descriptions-item label='Trạng thái'>
              <el-tag :type="
                  reportStoreState.status === 'từ chối'
                  ? 'danger'
                  : reportStoreState.status === 'đang xử lý'
                  ? 'warning'
                  : 'success'"> {{ reportStoreState.status }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label='Ngày tạo'>{{ reportStoreState.created_at }}</el-descriptions-item>
            <el-descriptions-item label='Giới tính'>{{ reportStoreState.client_gender }}</el-descriptions-item>
            <el-descriptions-item label='Ngày sinh'>{{ reportStoreState.client_birthdate }}
            </el-descriptions-item>

            <el-descriptions-item label='Họ và tên'>{{ reportStoreState.client_fullname }}
            </el-descriptions-item>
          </el-descriptions>
        </el-row>
      </el-card>
      <el-card class='report-card'>
        <template #header>
          <div class='card-header'>
            <h2>
              Thông tin người báo cáo
            </h2>
          </div>
        </template>
        <el-descriptions
          :column='4'
          border
          direction='vertical'
          size='large'
        >
          <el-descriptions-item label='Họ và tên'>{{ reportStoreState.reporter_fullname }}
          </el-descriptions-item>
          <el-descriptions-item label='Số điện thoại'>{{ reportStoreState.reporter_phone }}</el-descriptions-item>
          <el-descriptions-item label='Email'>{{ reportStoreState.client_fullname }}</el-descriptions-item>
          <el-descriptions-item label='Chức danh'>{{ reportStoreState.title ? reportStoreState.title : 'Không' }}
          </el-descriptions-item>
          <el-descriptions-item :span='2' label='Người chứng kiến 1'>{{ reportStoreState.observer_1 }}
          </el-descriptions-item>
          <el-descriptions-item :span='2' label='Người chứng kiến 2'>{{ reportStoreState.observer_2 }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
      <el-card class='report-card'>
        <template #header>
          <div class='card-header flex'>
            <h2 class='w-2/3'>
              Nơi xảy ra sự cố
            </h2>
            <div class='flex flex-row-reverse space-x-4 space-x-reverse w-2/3'>
              <el-date-picker
                :disabled='true'
                v-model='reportStoreState.issued_date'
                placeholder='Ngày giờ xảy ra sự cố'
                type='datetime'
              />
            </div>
          </div>
        </template>
        <el-descriptions
          :column='2'
          border
          direction='vertical'
          size='large'
        >
          <el-descriptions-item label='Khoa/phòng/vị trí xảy ra sự cố'>{{ reportStoreState.incident_location }}
          </el-descriptions-item>
          <el-descriptions-item label='Vị trí cụ thể'>{{ reportStoreState.exact_location }}</el-descriptions-item>
          <el-descriptions-item label='Mô tả ngắn gọn về sự cố'>{{ reportStoreState.short_description }}
          </el-descriptions-item>
          <el-descriptions-item label='Đề xuất giải pháp ban đầu'>{{ reportStoreState.proposal_solution }}
          </el-descriptions-item>
          <el-descriptions-item label='Điều trị/xử lí ban đầu đã được thực hiện'>{{ reportStoreState.performed_treatment
            }}
          </el-descriptions-item>
        </el-descriptions>
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
                <el-checkbox-group v-model='incident_classification' :disabled='true' :max='1'>
                  <el-checkbox :checked='incident_classification[0] === "happen"' label='Chưa xảy ra' />
                  <el-checkbox :checked='incident_classification[0] === "not_happen"' label='Đã xảy ra' />
                </el-checkbox-group>
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
                <el-checkbox-group v-model='is_family_noticed' :disabled='true' :max='1'>
                  <el-checkbox :checked='is_family_noticed[0] === "yes"' label='Có' />
                  <el-checkbox :checked='is_family_noticed[0] === "no"' label='Không' />
                  <el-checkbox :checked='is_family_noticed[0] === "not_acknowledged"' label='Không ghi nhận' />
                </el-checkbox-group>
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
                <el-checkbox-group v-model='is_informed' :disabled='true' :max='1'>
                  <el-checkbox :checked='is_informed[0] === "yes"' label='Có' />
                  <el-checkbox :checked='is_informed[0] === "no"' label='Không' />
                  <el-checkbox :checked='is_informed[0] === "not_acknowledged"' label='Không ghi nhận' />
                </el-checkbox-group>
              </div>
            </el-card>
          </el-col>
          <el-col :span='12'>
            <el-card>
              <template #header class='sp'>
                <div class='card-header'>
                  <h3>
                    Ghi nhận hồ sơ bệnh án/giấy tờ liên quan
                  </h3>
                </div>
              </template>
              <div class='flex flex-row-reverse space-x-4 space-x-reverse'>
                <el-checkbox-group v-model='is_recorded' :disabled='true' :max='1'>
                  <el-checkbox :checked='is_client_noticed[0] === "yes"' label='Có' />
                  <el-checkbox :checked='is_client_noticed[0] === "no"' label='Không' />
                  <el-checkbox :checked='is_client_noticed[0] === "not_acknowledged"' label='Không ghi nhận' />
                </el-checkbox-group>
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
                <el-checkbox-group v-model='is_client_noticed' :disabled='true' :max='1'>
                  <el-checkbox :checked='is_client_noticed[0] === "yes"' label='Có' />
                  <el-checkbox :checked='is_client_noticed[0] === "no"' label='Không' />
                  <el-checkbox :checked='is_client_noticed[0] === "not_acknowledged"' label='Không ghi nhận' />
                </el-checkbox-group>
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
                <el-checkbox-group v-model='impact_assessment' :disabled='true' :max='1'>
                  <el-checkbox :checked='impact_assessment[0] === "hard"' label='Nặng' />
                  <el-checkbox :checked='impact_assessment[0] === "medium"' label='Trung bình' />
                  <el-checkbox :checked='impact_assessment[0] === "light"' label='Nhẹ' />
                </el-checkbox-group>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </el-row>
</template>

<script lang='ts' setup>
import { useReportStore } from 'modules/reports/store/state'
import { ref } from 'vue'

const reportStore = useReportStore()
const reportStoreState = reportStore.$state.reportState

const gender = ref([reportStoreState.client_gender])
const incident_subject = ref([reportStoreState.incident_subject])
const incident_classification = ref([reportStoreState.incident_classification])
const is_family_noticed = ref([reportStoreState.is_family_noticed])
const is_informed = ref([reportStoreState.is_informed])
const is_recorded = ref([reportStoreState.is_recorded])
const is_client_noticed = ref([reportStoreState.is_client_noticed])
const impact_assessment = ref([reportStoreState.impact_assessment])

console.log(reportStoreState.report_reference)

// Will get this from db
</script>


