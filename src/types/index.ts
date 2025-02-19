export type Patient = {
  id: string;
  name: string;
  caretaker: string;
  email: string;
  maxLength: number;
  date: Date;
  symptomps: string;
};

export type DraftPatient = Omit<Patient, "id">;
