export interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  createdAt: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}
