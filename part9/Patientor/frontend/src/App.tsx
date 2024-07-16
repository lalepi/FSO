import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";
import {
  Button,
  Divider,
  Container,
  Typography,
  TableRow,
  TableBody,
  TableCell,
  Table,
} from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const SinglePatient = () => {
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

  if (patient)
    return (
      <Container>
        <Typography key={patient.id}></Typography>
        <Typography variant="h6" paddingTop="20px">
          {patient.name}
        </Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell> ssn: {patient.ssn}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>gender: {patient.gender}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>occupation: {patient.occupation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
    );
};

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/patients/:id" element={<SinglePatient />} />
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
