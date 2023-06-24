import { gql } from '@apollo/client';
import {BlogType, UserType} from "../types/types";

export const USER_LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

export const USER_SIGNUP = gql`
    mutation signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

export const ADD_BLOG = gql`
    mutation addBlog($title: String!, $content: String!, $date: String!, $user: ID!) {
        addBlog(title: $title, content: $content, date: $date, user: $user) {
            title
        }
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($text: String!, $date: String!, $user: ID!, $blog: ID!) {
        addComment(text: $text, date: $date, user: $user, blog: $blog) {
            id
        }
    }
`;
