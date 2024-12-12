export interface AnalyticsData {
    date: string;
    value: number;
  }
  
// User Type Definition
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  region: string;
  status: boolean;
  createdAt: string; // ISO Date format
}

export interface MonthData {
  month: string;
  year: number;
  count: number;
}
