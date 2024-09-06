import { useEffect, useState } from "react"
import Card from "../components/card"
import { TCharactersLocation } from "../types/CharacterLocation";
import { useQuery } from "@apollo/client";
import GET_CHARACTERS_BY_IDS, { TGetCharactersByIdsResult } from "../graphql/queries/getCharactersByIds";
import { Message } from "../atoms/message";
import { SectionTitle } from "../atoms/section-title";

const Locations = () => {
    const [listLocation, setListLocation] = useState<string[]>([])
    const [charactersLocation, setCharacterLocation] = useState<TCharactersLocation>([])
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
    const [apprIds, setApprIds] = useState<number[]>([])

    const handleClickButton = (loc: string) => {
        setSelectedLocation(loc)
    }

    useEffect(() => {
        if (selectedLocation) {
            const charactersIds = charactersLocation
                .filter((characterLocation) => characterLocation.location == selectedLocation)
                .map((temp) => temp.id)
            setApprIds(charactersIds)
        }
        console.log(selectedLocation)
    }, [selectedLocation, charactersLocation])

    useEffect(() => {
        const location = localStorage.getItem("location")
        if (location) {
            setListLocation(JSON.parse(location))
        }
        const charLoc = localStorage.getItem("characterLocation")
        if (charLoc) {
            setCharacterLocation(JSON.parse(charLoc))
        }
    }, [])

    return (
        <section className="flex flex-col items-center px-4">
            <div className="w-full sm:w-10/12" >
                <div className="mb-6">
                    <SectionTitle text="Pilih Lokasi" />
                    <div className="flex flex-wrap gap-2 mb-2 flex-co">
                        {
                            listLocation.map((loc, index) => <Button key={index} onclick={handleClickButton} text={loc} />)
                        }
                    </div>
                </div>
                {
                    selectedLocation ? <SectionTitle text={`Karakter Yang Berada Di : ${selectedLocation}`} /> : <Message text="Silahkan Pilih Lokasi" />
                }
                {
                    selectedLocation ? apprIds.length > 0 ? <Characters ids={apprIds} /> : <Message text="Karakter Tidak Ditemukan" /> : ''
                }
            </div>
        </section >
    )
}

const Characters = ({ ids }: { ids: number[] }) => {
    const { data } = useQuery<TGetCharactersByIdsResult>(GET_CHARACTERS_BY_IDS, {
        variables: {
            ids: ids
        }
    })

    return (
        <div className="flex flex-wrap gap-2">
            {data?.charactersByIds.map((character) => <Card key={character.id} species={character.species} image={character.image} name={character.name} id={character.id} />)}
        </div>
    )
}

const Button = ({ text, onclick }: { text: string, onclick: (loc: string) => void }) => {
    return (
        <button onClick={() => { onclick(text) }} className="px-4 py-1 text-xs bg-green-400 rounded-md font-['Poppins']" >{text}</button>
    )
}

export default Locations