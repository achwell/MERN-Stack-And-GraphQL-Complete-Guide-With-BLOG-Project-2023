import {gql} from '@apollo/client';

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

export const GET_USER_BLOGS = gql`
    query user($id:ID!){
        user(id:$id) {
            blogs {
                title
                content
                date
                comments {
                    id
                    text
                    user {
                        name
                    }
                }
            }
        }
    }
`;

export const GET_BLOG_BY_ID = gql`
    query user($id:ID!){
        blog(id:$id) {
            title
            content
            date
            user {
                name
                email
            }
            comments {
                id
                text
                user {
                    name
                }
            }
        }
    }
`;
