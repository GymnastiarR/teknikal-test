import { gql } from "@apollo/client";
import { TCharacter } from "../../types/Character";

const GET_CHARACTERS_BY_IDS = gql`
  query GetCharacterByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      image
    }
  }
`;

export type TGetCharactersByIdsResult = {
  charactersByIds: TCharacter[];
};

export default GET_CHARACTERS_BY_IDS;
