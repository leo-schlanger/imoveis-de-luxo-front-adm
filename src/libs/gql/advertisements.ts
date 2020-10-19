import gql from 'graphql-tag';
import { IAdvertisement } from '../entities/advertisements';

export interface IQueryAdvertisementsListData {
  advertisements: {
    list: IAdvertisement[];
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
  query getAdvertisementById($id: String!) {
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
          address
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
    $number: String
    $complement: String
    $address: String!
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
          number: $number
          complement: $complement
          address: $address
        }
      }
    ) {
      id
      title
    }
  }
`;
