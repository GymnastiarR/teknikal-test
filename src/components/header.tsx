import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="flex px-8 py-4 mb-4 bg-black sm:py-6 sm:justify-center">
            <div className="flex items-center justify-between w-full sm:w-10/12">
                <h1 className="text-base sm:text-xl font-semibold font-['Poppins'] text-gray-50"><Link to="/" >Fandom</Link></h1>
                <ul className="flex gap-2 sm:gap-12">
                    <li className="text-sm text-white font-['Poppins']">
                        <Link to="/" >Home</Link>
                    </li>
                    <li className="text-sm text-white font-['Poppins']">
                        |
                    </li>
                    <li className="text-sm text-white font-['Poppins']">
                        <Link to="/location" >Location</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header