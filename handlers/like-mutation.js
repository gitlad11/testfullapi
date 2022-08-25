import { gql } from '@apollo/client';

const LIKE_MUTATION = gql`
mutation Like($id: Number!) {
    vote(linkId: $id) {
      id
    }
  }`;

export default LIKE_MUTATION;