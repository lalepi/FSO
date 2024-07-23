import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";

import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from "../types";

import patientService from "../services/patients";

interface Props {
  diagnosis: Diagnosis[];
}

export const SinglePatient = ({ diagnosis }: Props) => {
  const [patient, setPatient] = useState<Patient>();

  const id = String(useParams().id);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/patients/${id}`);

    const fetchPatient = async () => {
      const patient = await patientService.getSingle(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  const parseDiagnoses = () => {
    let array: string[] = [];
    if (patient)
      patient.entries.map((entries: Entry) => {
        if (entries.diagnosisCodes) array = entries.diagnosisCodes;
      });
    return array;
  };

  const Diagnoses = () => {
    const diagnosisCodes = parseDiagnoses();

    const patientDiagnoses = diagnosisCodes.map((item) => {
      return diagnosis.filter((diagnosis) => diagnosis.code == item);
    });

    if (patientDiagnoses)
      return (
        <div>
          {patientDiagnoses.map((singleDiag, index) => (
            <div key={index}>
              {singleDiag.map((item) => (
                <li key={index}>
                  {item.code} {item.name}
                  {item.latin}
                </li>
              ))}
            </div>
          ))}
        </div>
      );
    else return null;
  };

  if (patient)
    return (
      <Container>
        <Typography key={patient.id}></Typography>
        <Typography variant="h5" paddingTop="20px">
          {patient.name}
        </Typography>
        <Typography variant="inherit">ssn: {patient.ssn}</Typography>
        <Typography variant="inherit">gender: {patient.gender}</Typography>
        <Typography variant="inherit">
          occupation: {patient.occupation}
        </Typography>

        <Typography variant="h6" paddingTop="20px">
          entries
        </Typography>
        {patient.entries.map((entries: Entry) => (
          <div key={entries.id}>
            <Typography variant="inherit">
              {entries.date} {entries.description}
            </Typography>
          </div>
        ))}
        <Box paddingTop="20px">
          <div>{Diagnoses()}</div>
        </Box>
      </Container>
    );
};
