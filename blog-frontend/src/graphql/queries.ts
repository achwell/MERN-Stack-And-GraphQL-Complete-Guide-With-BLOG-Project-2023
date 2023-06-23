import { gql } from '@apollo/client';

export const GET_BLOGS = gql`
    query {
        blogs {
            id
            title
            date
            content
            user {
                name
            }
        }
    }
`;
