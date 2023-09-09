import { defineStore } from 'pinia'
import {
  BooleanChoices,
  Genders,
  ImpactAssessment,
  IncidentClassification,
  IncidentSubjects,
  ReportsForm,
  ReportState,
} from './types'

export const useReportStore = defineStore('report', {
  state: () => ({
    reportState: {} as ReportState,
  }),
  actions: {
    saveReportState(form: any) {
      this.reportState = {
        id: form.id,
        report_reference: form.report_reference,
        is_required: form.is_required,
        unit: form.unit,
        client_fullname: form.client_fullname,
        client_birthdate: form.client_birthdate,
        client_medical_record_id: form.client_medical_record_id,
        department: form.department,
        incident_subject: form.incident_subject,
        incident_location: form.incident_location,
        exact_location: form.exact_location,
        issued_date: form.issued_date,
        short_description: form.short_description,
        proposal_solution: form.proposal_solution,
        performed_treatment: form.performed_treatment,
        is_informed: form.is_informed,
        is_recorded: form.is_recorded,
        is_family_noticed: form.is_family_noticed,
        is_client_noticed: form.is_client_noticed,
        incident_classification: form.incident_classification,
        impact_assessment: form.impact_assessment,
        reporter_fullname: form.reporter_fullname,
        reporter_phone: form.reporter_phone,
        reporter_email: form.reporter_email,
        observer_1: form.observer_1,
        observer_2: form.observer_2,
        title: form.title,
        status: form.status,
        created_at: form.created_at,
        updated_at: form.updated_at,
      }
    },
    clearReportState() {
      this.reportState = {} as ReportState
    },
  },
})

export const analysisState = defineStore({
  id: 'analysis.state',
  state: (): { recommendation_incident_prevention: string; incident_type: string; organization_level: string; created_at: undefined; analysis_id: string; client_level: string; solution_executed: string; detailed_description: string; treatment_executed: string; updated_at: undefined; is_accorded: undefined; reported: string; incident_reason: string; id: number; group_leader_evaluation: string; is_aligned_with_reporter: undefined } => {
    return {
      analysis_id: '',
      client_level: '',
      created_at: undefined,
      detailed_description: '',
      group_leader_evaluation: '',
      id: 0,
      incident_reason: '',
      incident_type: '',
      is_accorded: undefined,
      is_aligned_with_reporter: undefined,
      organization_level: '',
      recommendation_incident_prevention: '',
      reported: '',
      solution_executed: '',
      treatment_executed: '',
      updated_at: undefined,
    }
  },
})

export const usePaginationStore = defineStore('response', {
  state: () => ({
    totalObjects: 25,
    perPage: 20,
    currentPage: 2,
    nextPage: null,
    previousPage: 1,
  }),
  actions: {
    goToNextPage() {
      if (this.nextPage !== null) {
        // Logic to navigate to the next page
        // Example: router.push(`/page/${this.nextPage}`);
      }
    },
    goToPreviousPage() {
      if (this.previousPage !== null) {
        // Logic to navigate to the previous page
        // Example: router.push(`/page/${this.previousPage}`);
      }
    },
    getState() {
      return {
        totalObjects: this.totalObjects,
        perPage: this.perPage,
        currentPage: this.currentPage,
        nextPage: this.nextPage,
        previousPage: this.previousPage,
      }
    },
  },
})
