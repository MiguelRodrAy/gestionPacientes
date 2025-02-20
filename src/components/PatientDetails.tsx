import { Patient } from "../types";
import PatientDetailItem from "./PatientDetailItem";
import { usePatientStore } from "../store/store";
import { toast } from "react-toastify";

type PatientDetailsProps = {
  patient: Patient;
};

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const { deletePatient, getPatientById } = usePatientStore((state) => state);

  const handleClick = () => {
    deletePatient(patient.id);
    toast.success("Paciente eliminado", {
      type: "error",
    });
  };
  return (
    <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl'>
      <PatientDetailItem label='ID:' data={patient.id} />
      <PatientDetailItem label='Nombre:' data={patient.name} />
      <PatientDetailItem label='Propietario:' data={patient.caretaker} />
      <PatientDetailItem label='Email:' data={patient.email} />
      <PatientDetailItem label='Date:' data={patient.date.toString()} />
      <PatientDetailItem label='Symptoms:' data={patient.symptomps} />

      <div className='flex flex-col gap-3 md:flex-row justify-between mt-10'>
        <button
          type='button'
          className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md'
          onClick={() => getPatientById(patient.id)}
        >
          Editar
        </button>{" "}
        <button
          className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white rounded-md'
          onClick={handleClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
