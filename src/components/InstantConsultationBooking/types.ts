export interface IDoctor {
  name: string;
  ratings: string;
  experience: number;
  speciality: string;
  profilePic?: string;
}

export interface Appointment {
  name: string;
  phoneNumber: string;
  id: string;
  date: string;
  time: { value: number; label: string };
}

export type SelectOptions = {
  label: string;
  value: number | string;
};