import { gql } from '@apollo/client';

export const EXAMPLE_MUTATION = gql`
  mutation Example($input: ExampleInput!) {
    exampleMutation(input: $input) {
      success
    }
  }
`;
