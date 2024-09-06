import { gql } from "@apollo/client";
import { TCharacter } from "../../types/Character";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        pages
        next
      }
      results {
        id
        name
        image
        species
      }
    }
  }
`;

export type TGetCharactersResult = {
  characters: {
    info: {
      pages: number;
      count: number;
      next: number;
      prev: number;
    };
    results: TCharacter[];
  };
};

export default GET_CHARACTERS;
