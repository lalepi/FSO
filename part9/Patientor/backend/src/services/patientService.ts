/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import patients from "../../data/patients";
import { v1 as uuid } from "uuid";

import {
  NewPatientEntry,
  NonSensitivePatientsEntry,
  PatientsEntry,
} from "../types";

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const findById = (id: string): PatientsEntry | undefined => {
  const entry = patients.find((d) => d.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
  findById,
};
