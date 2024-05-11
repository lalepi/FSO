export interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatientEntry = Omit<PatientsEntry, "id">;

export type NonSensitivePatientsEntry = Omit<PatientsEntry, "ssn">;
