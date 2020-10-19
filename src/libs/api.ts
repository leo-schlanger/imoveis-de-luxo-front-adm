import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
});

export default api;

export interface Plan {
  id: string;
  name: string;
  description: string;
  quantity_properties: number;
  quantity_photos: number;
  quantity_videos: number;
  value: number;
  created_at: Date;
  updated_at: Date;
}

export interface Advertisement {
  id: string;
  title: string;
  type: string;
  status: boolean;
  property: {
    type: string;
  };
  user: {
    name: string;
  };
}

export interface User {
  id: string;
  name: string;
  responsible: string;
  description: string;
  creci: string;
  email: string;
  phone: string;
  secondary_phone: string;
  avatar_url: string;
  status: 'new' | 'active' | 'inactive';
  type: 'adm' | 'advertiser' | 'user';
  plan: {
    name: string;
  };
  plan_status: boolean;
  created_at: Date;
  updated_at: Date;
}
