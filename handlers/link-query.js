import { gql } from '@apollo/client';

const LINKSQUERY = gql`
query {
  feed {
    count
    links {
      id
      description
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
}
`
export default LINKSQUERY;