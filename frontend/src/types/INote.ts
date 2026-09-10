export interface INote {
  _id: string; // MongoDB uses _id
  id?: string; // For backwards compatibility
  title: string;
  body: string;
  createdAt: string | Date; // Backend sends ISO string
  updatedAt?: string | Date; // Backend sends ISO string
}

