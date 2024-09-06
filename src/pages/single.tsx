import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { TCharactersLocation } from "../types/CharacterLocation";
import GET_CHARACTER, { TGetCharacterResult } from "../graphql/queries/getCharacter";
import { SectionTitle } from "../atoms/section-title";

const Single = () => {
    const { id } = useParams();
    const [currentLocation, setCurrentLocation] = useState<string>('')
    const [characterLocation, setCharacterLocation] = useState<{ id: number, location: string }[]>([])
    const formT = useRef(null)
    const [optLocation, setOptLocation] = useState<string[]>([])
    const { data } = useQuery<TGetCharacterResult>(GET_CHARACTER, {
        variables: {
            id: id
        }
    })

    useEffect(() => {
        const loc = window.localStorage.getItem('location')
        const charLoc = window.localStorage.getItem('characterLocation')

        if (loc) {
            setOptLocation(JSON.parse(loc) as string[])
        }

        if (charLoc) {
            setCharacterLocation(JSON.parse(charLoc) as TCharactersLocation)
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentLocation(e.target.value)
    }

    const handleClick = () => {
        const isExist = optLocation.find((loc) => loc === currentLocation)
        if (!isExist) {
            setOptLocation([...optLocation, currentLocation])
            window.localStorage.setItem('location', JSON.stringify([...optLocation, currentLocation]))
        }

        const prevLocation = characterLocation.find((loc) => loc.id === data?.character.id)

        if (prevLocation) {
            prevLocation.location = currentLocation
            window.localStorage.setItem('characterLocation', JSON.stringify(characterLocation))
        } else {
            const newLocationData = [...characterLocation, { id: data?.character.id as number, location: currentLocation }]
            setCharacterLocation(newLocationData)
            window.localStorage.setItem('characterLocation', JSON.stringify(newLocationData))
        }

        setCurrentLocation('')
    }

    const getCharLocation = (id: number) => {
        const charLoc = characterLocation.find((loc) => loc.id === id)
        return charLoc ? charLoc.location : 'Unknown'
    }

    return (
        <section className="flex items-center px-4 sm:justify-center">
            <div className="flex flex-col md:flex-row sm:w-10/12 sm:gap-4">
                <img className="object-cover w-full rounded-md max-w-96 aspect-video" src={data?.character.image} alt="" />
                <div className="px-2 py-4 sm:py-0">
                    <div className="mb-4">
                        <SectionTitle text="Character Information" />
                        <table>
                            <tbody>
                                <tr>
                                    <td className="w-24 py-1 font-semibold">Name</td>
                                    <td>{data?.character.name}</td>
                                </tr>
                                <tr >
                                    <td className="w-24 py-1 font-semibold">Status</td>
                                    <td>{data?.character.status}</td>
                                </tr>
                                <tr>
                                    <td className="w-24 py-1 font-semibold">Spesies</td>
                                    <td>{data?.character.species}</td>
                                </tr>
                                <tr>
                                    <td className="w-24 py-1 font-semibold">Gender</td>
                                    <td>{data?.character.gender}</td>
                                </tr>
                                <tr>
                                    <td className="w-1/3 py-1 font-semibold">Location</td>
                                    <td>{getCharLocation(data?.character.id as number)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <SectionTitle text="Assign Location" />
                        <form ref={formT}>
                            <div className="flex gap-2">
                                <input list="opt" className="px-2 py-1 text-sm border-2 border-gray-700 rounded-md" value={currentLocation} onChange={handleChange} />
                                <datalist id="opt">
                                    {
                                        optLocation.map((loc) => (
                                            <option key={loc} value={loc} />
                                        ))
                                    }
                                </datalist>
                                <button className=" font-['Poppins'] px-3 py-1 text-sm bg-blue-400 rounded-md" type="button" onClick={handleClick}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Single