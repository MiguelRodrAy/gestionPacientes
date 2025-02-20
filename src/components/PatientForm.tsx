import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "./ErrorMessage";
import { usePatientStore } from "../store/store";

import type { DraftPatient } from "../types";
import { useEffect } from "react";

export default function PatientForm() {
  const { addPatient, patients, activeId, updatePatient } = usePatientStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<DraftPatient>();

  const registerPatient = (data: DraftPatient) => {
    if (activeId) {
      updatePatient(data);
      toast.success("Paciente actualizado");
      return;
    } else {
      addPatient(data);
      toast.success("Paciente añadido correctamente");
    }

    reset();
  };

  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter(
        (patient) => patient.id === activeId
      )[0];

      setValue("name", activePatient.name);
      setValue("caretaker", activePatient.caretaker);
      setValue("email", activePatient.email);
      setValue("date", activePatient.date);
      setValue("symptomps", activePatient.symptomps);
    }
  }, [activeId]);

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {""}
        <span className='text-indigo-600 font-bold'>Adminístralos</span>
      </p>

      <form
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className='mb-5'>
          <label htmlFor='name' className='text-sm uppercase font-bold'>
            Mascota
          </label>
          <input
            id='name'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre de su mascota'
            {...register("name", {
              required: "El nombre es obligatorio",
              maxLength: {
                value: 15,
                message: "Máximo 15 caracteres",
              },
            })}
          />

          {errors.name && <ErrorMessage>{errors.name?.message}</ErrorMessage>}

          {errors.maxLength && (
            <ErrorMessage>{errors.maxLength?.message}</ErrorMessage>
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='caretaker' className='text-sm uppercase font-bold'>
            Propietario
          </label>
          <input
            id='caretaker'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre del Propietario'
            {...register("caretaker", {
              required: "El nombre del propietario es obligatorio",
              maxLength: {
                value: 20,
                message: "Máximo 15 caracteres",
              },
            })}
          />

          {errors.name && (
            <ErrorMessage>{errors.caretaker?.message}</ErrorMessage>
          )}

          {errors.maxLength && (
            <ErrorMessage>{errors.maxLength?.message}</ErrorMessage>
          )}
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='text-sm uppercase font-bold'>
            Email
          </label>
          <input
            id='email'
            className='w-full p-3  border border-gray-100'
            type='email'
            placeholder='Email de Registro'
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email no válido",
              },
            })}
          />

          {errors.email && <ErrorMessage>{errors.email?.message}</ErrorMessage>}
        </div>

        <div className='mb-5'>
          <label htmlFor='date' className='text-sm uppercase font-bold'>
            Fecha Alta
          </label>
          <input
            id='date'
            className='w-full p-3  border border-gray-100'
            type='date'
            {...register("date", {
              required: "La fecha es obligatoria",
            })}
          />

          {errors.date && <ErrorMessage>{errors.date?.message}</ErrorMessage>}
        </div>

        <div className='mb-5'>
          <label htmlFor='symptoms' className='text-sm uppercase font-bold'>
            Síntomas
          </label>
          <textarea
            id='symptoms'
            className='w-full p-3  border border-gray-100'
            placeholder='Síntomas del paciente'
            {...register("symptomps", {
              required: "Debe añadir los síntomas",
            })}
          ></textarea>

          {errors.date && (
            <ErrorMessage>{errors.symptomps?.message}</ErrorMessage>
          )}
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value='Guardar Paciente'
        />
      </form>
    </div>
  );
}
