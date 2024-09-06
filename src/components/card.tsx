import { useNavigate } from 'react-router-dom';

const Card = ({ name, species, image, id }: { name: string, species: string, image: string, id: number }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => { navigate(`/character/${id}`) }} className="flex-grow overflow-hidden bg-white rounded-sm cursor-pointer max-w-80 h-72 drop-shadow-md" >
            <div className="h-3/4">
                <img className="object-cover w-full h-full" src={image} />
            </div>
            <div className="px-4 py-2">
                <h3 className="font-['Poppins'] mb-1 font-semibold" style={{ color: "black", fontFamily: "Poppins" }}>{name}</h3>
                <p className="text-sm font-['Poppins']">{species}</p>
            </div>
        </div>
    )
}

export default Card;