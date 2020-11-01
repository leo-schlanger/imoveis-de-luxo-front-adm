import gql from 'graphql-tag';
import { Advertisement } from '../entities/advertisements';

export interface IQueryAdvertisementsListData {
  advertisements: {
    list: Advertisement[];
    total: number;
  };
}

export const FIND_ADVERTISEMENTS = gql`
  query findAdvertisements($per_page: Int, $page: Int) {
    advertisements(data: { per_page: $per_page, page: $page }) {
      list {
        id
        title
        type
        property {
          type
        }
        user {
          name
        }
      }
      total
    }
  }
`;

export const FIND_ADVERTISEMENT_BY_ID = gql`
  query getAdvertisementById($id: Int!) {
    getAdvertisementById(id: $id) {
      id
      title
      description
      type
      user {
        id
        name
        creci
        email
        phone
        type
      }
      property {
        address {
          country
          state
          postal_code
          neighborhood
          sub_neighborhood
          street
          number
          complement
        }
        type
        value
      }
    }
  }
`;

export const DELETE_ADVERTISEMENT = gql`
  mutation deleteAdvertisement($id: String!) {
    deleteAdvertisement(id: $id)
  }
`;

export const CREATE_ADVERTISEMENT = gql`
  mutation createAdvertisement(
    $title: String!
    $description: String
    $status: Boolean!
    $type: AdvertisementTypeEnum!
    $address_visible: Boolean!
    $type_property: PropertyTypeEnum!
    $value: Float!
    $country: String!
    $state: String!
    $postal_code: String!
    $neighborhood: String!
    $sub_neighborhood: String
    $number: String
    $complement: String
    $street: String!
  ) {
    createAdvertisement(
      data: {
        title: $title
        description: $description
        status: $status
        type: $type
        address_visible: $address_visible
        property: {
          type: $type_property
          value: $value
          country: $country
          state: $state
          postal_code: $postal_code
          neighborhood: $neighborhood
          sub_neighborhood: $sub_neighborhood
          number: $number
          complement: $complement
          street: $street
        }
      }
    ) {
      id
      title
    }
  }
`;

// TODO: solucionar no backend dps ativar
// $status: Boolean
// $address_visible: Boolean
// status: $status
// address_visible: $address_visible

export const UPDATE_ADVERTISEMENT = gql`
  mutation updateAdvertisement(
    $id: Int
    $title: String
    $description: String
    $type: AdvertisementTypeEnum
    $type_property: PropertyTypeEnum
    $value: Float
    $country: String
    $state: String
    $postal_code: String
    $neighborhood: String
    $sub_neighborhood: String
    $number: String
    $complement: String
    $street: String
  ) {
    updateAdvertisement(
      id: $id
      data: {
        title: $title
        description: $description
        type: $type
        property: {
          type: $type_property
          value: $value
          country: $country
          state: $state
          postal_code: $postal_code
          neighborhood: $neighborhood
          sub_neighborhood: $sub_neighborhood
          number: $number
          complement: $complement
          street: $street
        }
      }
    ) {
      id
      title
    }
  }
`;
