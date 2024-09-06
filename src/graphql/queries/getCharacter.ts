import { gql } from "@apollo/client";
import { TCharacter } from "../../types/Character";

const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      image
      name
      status
      species
      gender
    }
  }
`;

export type TGetCharacterResult = {
  character: TCharacter;
};

export default GET_CHARACTER;
