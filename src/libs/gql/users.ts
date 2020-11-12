import gql from 'graphql-tag';
import { User } from '../entities/user';

export interface IQueryUsersListData {
  users: {
    list: User[];
    total: number;
  };
}

export const FIND_USERS = gql`
  query findUsers($per_page: Int, $page: Int) {
    users(data: { per_page: $per_page, page: $page }) {
      list {
        id
        name
        email
        type
        status
      }
      total
    }
  }
`;

export const FIND_USERS_BY_STATUS = gql`
  query findUsers($per_page: Int, $page: Int, $status: UserStatusEnum) {
    users(
      data: { per_page: $per_page, page: $page, filter: { status: $status } }
    ) {
      list {
        id
        name
        email
        type
        status
      }
      total
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  query getUserById($id: String!) {
    getUserById(id: $id) {
      id
      name
      responsible
      creci
      email
      phone
      secondary_phone
      status
      type
      avatar_url
      address {
        country
        state
        postal_code
        neighborhood
        sub_neighborhood
        number
        complement
        street
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $responsible: String
    $creci: String
    $email: String!
    $phone: String!
    $secondary_phone: String
    $status: UserStatusEnum
    $type: UserTypeEnum!
    $password: String!
  ) {
    createUser(
      data: {
        name: $name
        responsible: $responsible
        creci: $creci
        email: $email
        phone: $phone
        secondary_phone: $secondary_phone
        password: $password
        status: $status
        type: $type
      }
    ) {
      id
      name
      creci
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: String!
    $name: String
    $responsible: String
    $creci: String
    $email: String
    $phone: String
    $secondary_phone: String
    $status: UserStatusEnum
    $type: UserTypeEnum
    $country: String
    $state: String
    $postal_code: String
    $neighborhood: String
    $sub_neighborhood: String
    $number: String
    $complement: String
    $street: String
  ) {
    updateUser(
      id: $id
      data: {
        name: $name
        responsible: $responsible
        creci: $creci
        email: $email
        phone: $phone
        secondary_phone: $secondary_phone
        status: $status
        type: $type
        address: {
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
      name
      creci
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;
