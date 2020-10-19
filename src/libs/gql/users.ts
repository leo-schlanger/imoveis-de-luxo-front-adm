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

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;
