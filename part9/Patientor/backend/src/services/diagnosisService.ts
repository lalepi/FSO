import diagnoses from "../../data/diagnoses";

import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis,
};
