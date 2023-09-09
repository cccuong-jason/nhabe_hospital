<template>
  <div class='w-full'>
    <div class='flex flex-wrap flex-col bg-white shadow mb-7 mx-auto rounded-md'>
      <div class='flex flex-wrap items-center py-2 px-6 mb-0 border-b-dark-4'>
        <div class='max-w-full basis-0 grow'>
          <h3 class='mb-0 cursor-auto text-primary-dark'>{{ title }}</h3>
        </div>
        <div class='max-w-full basis-0 grow'>
          <div class='flex flex-wrap mb-0 pl-0 justify-end gap-x-3'>
            <div>
              <el-button type='primary' size='small'> Tất cả</el-button>
            </div>
          </div>
        </div>
      </div>

      <div class='block overflow-x-auto w-full p-0'>
        <el-table :data='tableData' style='width: 100%' class='is-light'>
          <el-table-column label='NHÓM SỰ CỐ' min-width='200'>
            <template #default='scope'>
              <div class='flex items-center'>
                <span class='mb-0 text-0.8125 font-semibold cursor-auto text-dark-lighter'>{{
                    scope.row.pageName
                  }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label='SỐ LƯỢNG' min-width='150'>
            <template #default='scope'>
              <div class='flex items-center'>
                <span class='px-4 text-0.8125 font-normal cursor-auto text-dark-lighter'>{{
                    scope.row.visitorNumber
                  }}</span>
              </div>
            </template>
          </el-table-column>
          <!--          <el-table-column label="UNIQUE USERS" min-width="150">-->
          <!--            <template #default="scope">-->
          <!--              <div class="flex items-center">-->
          <!--                <span class="px-4 text-0.8125 font-normal text-dark-lighter">{{-->
          <!--                  scope.row.userNumber-->
          <!--                }}</span>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column label='TỈ LỆ TĂNG/GIẢM' min-width='150'>
            <template #default='scope'>
              <div class='flex items-center'>
                <div class='px-4 flex justify-center gap-1'>
                  <div>
                    <ArrowNarrowUpIcon v-if='scope.row.rate > 45.0' class='w-4 h-4 text-success' />
                    <ArrowNarrowDownIcon v-else class='w-4 h-4 text-warning' />
                  </div>

                  <span class='text-0.8125 font-normal text-dark-lighter'
                  >{{ scope.row.rate }}%</span
                  >
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { ArrowNarrowDownIcon, ArrowNarrowUpIcon } from '@heroicons/vue/outline'

interface PageVisitInfo {
  pageName: string
  visitorNumber: string
  userNumber: number
  rate: number
}

export default defineComponent({
  name: 'PageVisitTable',
  components: {
    ArrowNarrowDownIcon,
    ArrowNarrowUpIcon,
  },
  props: {
    title: {
      type: String,
      default: 'Phân loại theo nhóm sự cố',
    },
  },
  setup() {
    const tableData: PageVisitInfo[] = [
      {
        pageName: 'NCO',
        visitorNumber: '50',
        userNumber: 340,
        rate: 10.98,
      },
      {
        pageName: 'NC1',
        visitorNumber: '20',
        userNumber: 319,
        rate: 30.50,
      },
      {
        pageName: 'NC2',
        visitorNumber: '15',
        userNumber: 294,
        rate: 14.25,
      },
      {
        pageName: 'NC3',
        visitorNumber: '2',
        userNumber: 147,
        rate: 50.87,
      },
    ]

    return {
      tableData,
    }
  },
})
</script>
