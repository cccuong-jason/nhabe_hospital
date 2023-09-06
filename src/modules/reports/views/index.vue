<template>
  <div class='main-page'>
    <div class='report-page'>
      <div class='centered-container'>
        <el-image :src='MedicalReportBanner' fit='contain' />
        <el-space>
          <el-button class='mt-12' size='large' @click='dialogTableVisible = true;'>
            Tạo báo cáo sự cố y khoa
          </el-button>
          <!--        <el-button @click="openAnalyticForm" size="large" class="mt-12">-->
          <!--          Tạo mẫu tìm hiểu và phân tích sự cố-->
          <!--        </el-button>-->
        </el-space>
      </div>
      <div class='dialog'>
        <el-drawer v-model='dialogTableVisible' :close-on-click-modal='false'
                   align-center direction='ttb' size='100%' title='DANH MỤC SỰ CỐ Y KHOA'>
          <el-tabs v-model='tabPosition' class='demo-tabs' type='card' @tab-click='handleClick'>
            <el-tab-pane label='Tự nguyện' name='voluntary'>
              <span class='my-3 p-5 text-sm font-extralight'>Vui lòng chọn sự cố y khoa để tiếp tục báo cáo.&nbsp;Đối với báo cáo tự nguyện, các sự cố được chia theo mức độ nghiêm trọng từ NC0 cho đến NC2</span>
              <el-cascader-panel
                v-model='shortIncidentDescription'
                :options='incidentCascade'
                :show-all-levels='false'
                class='mt-2'
                size='large'
                @change='handleChange'
                @expand-change='handleNC3Change'
              />
            </el-tab-pane>
            <el-tab-pane label='Bắt buộc' name='required'>
              <el-table :data='nc3IncidentGridData' style='width: 100%'>
                <el-table-column :index='indexMethod' type='index' />
                <el-table-column label='Tên sự cố' property='incident'>
                  <template #default='{ row }'>
                    <div v-html='addNewLine(row.incident)'></div>
                  </template>
                </el-table-column>
                <el-table-column label='Loại sự cố' property='type' width='200'>
                  <template #default='{ row }'>
                    <span>{{ mappingTypeToDisplay(row.type) }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <el-checkbox v-model='isConfirm' :disabled='isConfirm' class='mt-5' label='isConfirm' size='large'>Nếu đã
                đọc
                kĩ các danh mục phía
                trên, vui lòng chọn sự cố y khoa sau để tiếp tục báo cáo.
              </el-checkbox>
              <el-checkbox-group v-show='isConfirm' v-model='nc3Checkbox' :max='1' size='large'
                                 @change='handleCheckbox'>
                <el-checkbox-button label='Sự cố đã xảy ra gây nguy hại kéo dài, để lại di chứng' size='large'>Sự cố đã
                  xảy ra gây nguy hại kéo dài, để lại di chứng
                </el-checkbox-button>
                <el-checkbox-button label='Sự cố đã xảy ra gây nguy hại cần phải hồi sức tích cực' size='large'>Sự cố đã
                  xảy ra gây nguy hại cần phải hồi sức tích cực
                </el-checkbox-button>
                <el-checkbox-button label='Sự cố đã xảy ra có ảnh hưởng hoặc trực tiếp gây tử vong' size='large'>Sự cố
                  đã
                  xảy ra có ảnh hưởng hoặc trực tiếp gây tử vong
                </el-checkbox-button>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>


          <template #footer>
            <el-button plain size='large' type='danger' @click='clearSelectedIncident'>Xóa lựa chọn</el-button>
            <el-button :disabled='!reportType || !isReady' plain size='large' @click='openReportForm'>Tạo báo cáo
            </el-button>
          </template>
        </el-drawer>
      </div>
    </div>

  </div>
</template>

<script lang='ts'>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import MedicalReportBanner from '@/assets/images/medical_report_banner.png'
import IncidentCascadeJson from '@/assets/json/incident_cascade_voluntary.json'

import { DocumentAddIcon } from '@heroicons/vue/outline'
import { ElCascaderPanel, ElLoading, ElMessage } from 'element-plus'

import { addNewLine, indexMethod } from 'utils/index'


export default {
  name: 'Reports',
  setup() {
    const router = useRouter()
    const reportType = ref('')
    const isRequired = ref(false)
    const tabPosition = ref('voluntary')
    const shortIncidentDescription = ref('')
    const reportForm = ref('')
    const isConfirm = ref(false)
    const nc3Checkbox = ref([])
    const isReady = ref(false)

    const openReportForm = () => {
      if (reportType.value === '') {
        ElMessage({ message: 'Vui lòng chọn loại báo cáo', type: 'warning', showClose: true, grouping: true })
        return
      } else {
        const loading = ElLoading.service({
          lock: true,
          background: 'rgba(0, 0, 0, 0.7)',
        })

        setTimeout(() => {
          loading.close()
          router.push({ name: 'CreateReport', query: { reportType: reportType.value, reportForm: 'report' } })
        }, 1500)
      }
    }

    // Analytic Form
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


    // NC level & incident description
    const incidentCascade = IncidentCascadeJson
    const handleChange = (value: string) => {
      if (value != null && value[0] != undefined && value[value.length - 1] != undefined) {
        ElMessage(
          {
            message: addNewLine(`Mô tả sự cố: ${value[value.length - 1]}`),
            type: 'success',
            showClose: true,
            grouping: true,
          },
        )
        reportType.value = value[0]
        isReady.value = true
        return
      }
      return
    }

    const handleNC3Change = (value: string) => {
      const isRequired = value[0] === 'required'
      if (isRequired) {
        dialogTableVisible.value = true
        ElMessage('Báo cáo bắt buộc')
        return
      }
    }

    // Dialog
    const dialogTableVisible = ref(false)

    // NC3 Table Data, Mapping type to display
    const nc3IncidentGridData = [
      {
        incident: 'Phẫu thuật sai vị trí (bộ phận cơ thể)\n' +
          'Là phẫu thuật ở vị trí cơ thể người bệnh không đúng với những dữ kiện ghi trong hồ sơ bệnh án, ngoại trừ những tình huống khẩn cấp như:\n' +
          'A. Thay đổi vị trí phẫu thuật xảy ra quá trình phẫu thuật\n' +
          'B. Sự thay đổi này được chấp thuận.\n',
        type: 'surgery',
      },
      {
        incident: 'Phẫu thuật sai người bệnh:\n' +
          'Là phẫu thuật trên người bệnh không đúng với những dữ kiện về nhận diện người bệnh ghi trong hồ sơ bệnh án\n',
        type: 'surgery',
      },
      {
        incident: 'Phẫu thuật sai phương pháp (sai quy trình) gây tổn thương nặng:\n' +
          'Là phương pháp phẫu thuật thực hiện không đúng với kế hoạch phẫu thuật đã đề ra trước đó, ngoại trừ những tình huống khẩn cấp như:\n' +
          'A. Thay đổi phương pháp phẫu thuật xảy ra trong quá trình phẫu thuật.\n' +
          'B. Sự thay đổi này được chấp thuận.\n',
        type: 'surgery',
      },
      {
        incident: 'Bỏ quên y dụng cụ, vật tư tiêu hao trong cơ thể người bệnh sau khi kết thúc phẫu thuật hoặc những thủ thuật xâm lấn khác:\n' +
          'Ngoại trừ:\n' +
          'A. Y dụng cụ đó được cấy ghép vào người bệnh (theo chỉ định).\n' +
          'B. Y dụng cụ đó có trước phẫu thuật và được chủ ý giữ lại.\n' +
          'C. Y dụng cụ không có trước phẫu thuật được chủ ý để lại do có thể nguy hại khi lấy bỏ. Ví dụ như: những kim rất nhỏ hoặc những mảnh vỡ ốc vít\n',
        type: 'surgery',
      },
      {
        incident: 'Tử vong xảy ra trong toàn bộ quá trình phẫu thuật (tiền mê, rạch da, đóng da) hoặc ngay sau phẫu thuật trên người bệnh có phân loại ASA độ I.',
        type: 'surgery',
      },
      {
        incident: 'Tử vong hoặc di chứng nặng liên quan tới thuốc, thiết bị hoặc sinh phẩm',
        type: 'equipment',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng liên quan đến việc sử dụng hoặc liên quan đến chức năng của y dụng cụ trong quá trình chăm sóc người bệnh khác với kế hoạch đề ra ban đầu.',
        type: 'equipment',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng liên quan đến thuyên tắc khí nội mạch trong quá trình chăm sóc, điều trị người bệnh.\n' +
          'Ngoại trừ: Những thủ thuật ngoại thần kinh hoặc tim mạch được xác định có nguy cơ thuyên tắc khí nội mạch cao.\n',
        type: 'equipment',
      },
      {
        incident: 'Giao nhầm trẻ sơ sinh',
        type: 'management',
      },
      {
        incident: 'Người bệnh trốn viện bị tử vong hoặc bị di chứng nghiêm trọng',
        type: 'management',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng do tự tử tại cơ sở khám bệnh, chữa bệnh.',
        type: 'management',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng liên quan đến lỗi dùng thuốc:\n' +
          'Bao gồm: Cho một loại thuốc mà biết người bệnh có tiền sử dị ứng thuốc và tương tác thuốc có khả năng đưa đến tử vong hoặc di chứng nghiêm trọng.\n' +
          'Ngoại trừ: Những khác biệt có lý do của việc lựa chọn thuốc và liều dùng trong xử trí lâm sàng.\n',
        type: 'medical',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng liên quan đến tán huyết do truyền nhầm nhóm máu',
        type: 'medical',
      },
      {
        incident: 'Sản phụ tử vong hoặc di chứng nghiêm trọng liên quan đến quá trình chuyển dạ, sinh con:\n' +
          'Bao gồm những sự cố xảy ra trong thời kỳ hậu sản (42 ngày sau sinh).\n' +
          'Ngoại trừ:\n' +
          'A. Thuyên tắc phổi hoặc thuyên tắc ối\n' +
          'B. Gan nhiễm mỡ cấp tính trong thai kỳ\n' +
          'C. Bệnh cơ tim.\n',
        type: 'medical',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng do hạ đường huyết trong thời gian điều trị.',
        type: 'medical',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng (vàng da nhân) do tăng bilirubin máu ở trẻ sơ sinh.',
        type: 'medical',
      },
      {
        incident: 'Loét do tì đè độ 3 hoặc 4 xảy ra trong lúc nằm viện.',
        type: 'medical',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng do tập vật lý trị liệu gây sang chấn cột sống',
        type: 'medical',
      },
      {
        incident: 'Nhầm lẫn trong cấy ghép mô tạng.',
        type: 'medical',
      },
      {
        incident: 'Bao gồm nhầm lẫn tinh trùng hoặc trứng trong thụ tinh nhân tạo',
        type: 'medical',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng do điện giật.\n' +
          'Ngoại trừ: Những sự cố xảy ra do điều trị bằng điện (sốc điện phá rung hoặc chuyển nhịp bằng điện chọn lọc).\n',
        type: 'environment',
      },
      {
        incident: 'Tai nạn do thiết kế đường oxy hay những loại khí khác cung cấp cho người bệnh như:\n' +
          'A. Nhầm lẫn chất khí. Hoặc\n' +
          'B. Chất khí lẫn độc chất\n',
        type: 'environment',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng do bỏng phát sinh do bất kỳ nguyên nhân nào khi được chăm sóc tại cơ sở.',
        type: 'environment',
      },
      {
        incident: 'Người bệnh tử vong hoặc di chứng nghiêm trọng do té ngã trong lúc được chăm sóc y tế tại cơ sở.',
        type: 'environment',
      },
      {
        incident: 'Giả mạo nhân viên y tế để điều trị cho người bệnh',
        type: 'criminology',
      },
      {
        incident: 'Bắt cóc (hay dụ dỗ) người bệnh ở mọi lứa tuổi',
        type: 'criminology',
      },
      {
        incident: 'Tấn công tình dục người bệnh trong khuôn viên bệnh viện',
        type: 'criminology',
      },
      {
        incident: 'Gây tử vong hoặc thương tích nghiêm trọng cho người bệnh hoặc nhân viên y tế trong khuôn viên cơ sở khám bệnh, chữa bệnh',
        type: 'criminology',
      },
      {
        incident: 'Các sự cố y khoa nghiêm trọng khác (NC3 loại G, H, I) không đề cập trong các mục từ 1 đến 27',
        type: 'criminology',
      },
    ]

    const typeDisplayMapping = new Map<string, string>(
      [
        ['surgery', 'Sự cố phẫu thuật'],
        ['equipment', 'Sự cố về thiết bị y tế'],
        ['management', 'Sự cố quản lý'],
        ['medical', 'Sự cố y khoa'],
        ['environment', 'Sự cố môi trường'],
        ['criminology', 'Sự cố hình sự'],
      ])

    const mappingTypeToDisplay = (type: string) => {
      return typeDisplayMapping.get(type)
    }

    // Clear selected incident
    const clearSelectedIncident = () => {
      shortIncidentDescription.value = ''
      reportType.value = ''
      isReady.value = false
      nc3Checkbox.value = []
    }

    const handleCheckbox = (value: string) => {
      if (value.length == 0) {
        reportType.value = ''
        isReady.value = false
      }

      if (value.length > 0 && !isReady.value) {
        reportType.value = value[0]
        isReady.value = true
        ElMessage({
          message: addNewLine(`Mô tả sự cố: ${value[0]}`),
          type: 'success',
          grouping: true,
          showClose: true,
        })
      } else if (reportType.value !== '' && value.length > 0) {
        ElMessage({
          message: 'Bạn đã chọn báo cáo tự nguyện, vui lòng hủy chọn để tiếp tục báo cáo bắt buộc',
          type: 'warning',
          showClose: true,
          grouping: true,
        })
        isReady.value = false
      }
    }


    const testIntegration = () => {
      // fillPDFForm()
      // getListReport(2)
    }

    return {
      MedicalReportBanner,
      DocumentAddIcon,
      reportType,
      isRequired,
      tabPosition,
      reportForm,
      openReportForm,
      incidentCascade,
      handleChange,
      handleNC3Change,
      dialogTableVisible,
      addNewLine,
      nc3IncidentGridData,
      indexMethod,
      mappingTypeToDisplay,
      shortIncidentDescription,
      clearSelectedIncident,
      openAnalyticForm,
      isConfirm,
      nc3Checkbox,
      handleCheckbox,
      isReady,
      testIntegration,
    }
  },
}
</script>

<style>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
}

.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.image {
  display: block;
}
</style>
