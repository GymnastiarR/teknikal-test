import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/card';
import GET_CHARACTERS, { TGetCharactersResult } from '../graphql/queries/getCharacters';
import { SectionTitle } from '../atoms/section-title';
// import { TGetCharacterResult } from '../graphql/queries/getCharacter';


const CharacterList = () => {
    const { data, fetchMore } = useQuery<TGetCharactersResult>(GET_CHARACTERS, {
        variables: { page: 1 },
    });

    const loadMore = () => {
        if (data?.characters.info.next) {
            fetchMore({
                variables: {
                    page: data.characters.info.next,
                },
                updateQuery(previousData, { fetchMoreResult }) {
                    const updated = fetchMoreResult;
                    updated.characters.results = [...previousData.characters.results, ...fetchMoreResult.characters.results];
                    return updated;
                },
            });
        }
    };

    return (
        <section className="px-4">
            <InfiniteScroll
                dataLength={data?.characters.results.length || 0}
                next={loadMore}
                hasMore={!!data?.characters.info.next}
                loader={<h4>Loading...</h4>}
                className='flex flex-col items-center justify-center'
            >
                <div className='sm:w-10/12'>
                    <SectionTitle text='Rick and Morty Characters' />
                </div>
                <div className='flex flex-wrap justify-center gap-3 sm:w-10/12'>
                    {data?.characters.results.map((character) => <Card species={character.species} id={character.id} name={character.name} image={character.image} key={character.id} />)}
                </div>
            </InfiniteScroll>
        </section>
    );
};

export default CharacterList;
