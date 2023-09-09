import { reactive, ref } from 'vue'

export interface ReportState {
  id: number;
  report_reference: string;
  is_required: ReportsForm;
  unit: string;
  client_fullname: string;
  client_birthdate: Date;
  client_medical_record_id: string;
  client_gender: Genders;
  department: string;
  incident_subject: IncidentSubjects;
  incident_location: string;
  exact_location: string;
  issued_date: Date;
  short_description: string;
  proposal_solution: string;
  performed_treatment: string;
  is_informed: BooleanChoices;
  is_recorded: BooleanChoices;
  is_family_noticed: BooleanChoices;
  is_client_noticed: BooleanChoices;
  incident_classification: IncidentClassification;
  impact_assessment: ImpactAssessment;
  reporter_fullname: string;
  reporter_phone: string;
  reporter_email: string;
  observer_1: string;
  observer_2: string;
  title: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export enum ReportsForm {
  is_required = 'is_required',
  is_voluntary = 'is_voluntary'
}

export enum Genders {
  male = 'male',
  female = 'female'
}

export enum IncidentSubjects {
  client = 'client',
  visitor = 'visitor',
  staff = 'staff',
  infrastructure = 'infrastructure'
}

export enum BooleanChoices {
  yes = 'yes',
  no = 'no',
  notAcknowledged = 'not_acknowledged'
}

export enum IncidentClassification {
  happen = 'happen',
  notHappen = 'not_happen'
}

export enum ImpactAssessment {
  hard = 'hard',
  medium = 'medium',
  light = 'light'
}
