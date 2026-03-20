export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  status: "Active" | "Inactive" | "At Risk";
  lastVisit: string;
  nextAppointment: string;
  address: string;
  department: string;
  conditions: string[];
  medications: string[];
  bloodType: string;
}
