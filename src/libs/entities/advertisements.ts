import { User } from './user';

export type AdvertisementType = 'PURCHASE' | 'TENANCY';

export const advertisementTypeDescription = {
  '': 'Todos',
  PURCHASE: 'Compra',
  TENANCY: 'Aluguel',
} as const;

export type PropertyType =
  | 'HOME'
  | 'APARTMENT'
  | 'PENTHOUSE'
  | 'GRANGE'
  | 'FARM'
  | 'TERRAIN'
  | 'SHED'
  | 'CORPORATE'
  | 'OFFICE'
  | 'STORE'
  | 'HOTEL'
  | 'INN'
  | 'ISLAND'
  | 'CUSTOMIZED';

export const propertyTypeDescription = {
  '': 'Todos',
  HOME: 'Casa',
  APARTMENT: 'Apartamento',
  PENTHOUSE: 'Cobertura',
  GRANGE: 'Sítio',
  FARM: 'Fazenda',
  TERRAIN: 'Terreno',
  SHED: 'Galpão',
  CORPORATE: 'Corporativo',
  OFFICE: 'Escritório',
  STORE: 'Loja',
  HOTEL: 'Hotel',
  INN: 'Pousada',
  ISLAND: 'Ilha',
  CUSTOMIZED: 'Customizado',
} as const;

export interface IAdvertisement {
  id: string;
  title: string;
  type: AdvertisementType;
  status: boolean;
  property: {
    type: PropertyType;
  };
  user: User;
}
