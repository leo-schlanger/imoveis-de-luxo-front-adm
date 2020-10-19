import { Plan } from './plan';

export type UserStatus = 'NEW' | 'ACTIVE' | 'INACTIVE';

export const UserStatusDescription = {
  '': 'Todos',
  NEW: 'Novo',
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
} as const;

export type UserType = 'ADM' | 'ADVERTISER' | 'USER';

export const UserTypeDescription = {
  '': 'Todos',
  ADM: 'Administrador',
  ADVERTISER: 'Anunciante',
  USER: 'Usuário',
} as const;

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  secondary_phone: string;
  avatar_url: string;
  responsible: string;
  description: string;
  creci: string;
  status: UserStatus;
  type: UserType;
  plan: Plan;
  plan_status: boolean;
  address: {
    country: string;
    state: string;
    postal_code: string;
    neighborhood: string;
    sub_neighborhood: string | undefined;
    address: string;
    number: string | undefined;
    complement: string | undefined;
    description: string | undefined;
  };
}
