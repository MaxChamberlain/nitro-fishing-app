import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import SelectionTile from "../components/Manage/SelectionTile"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { useNavigate } from "react-router-dom"

export default function Manage() {
    const { user } = useContext(UserContext)
    const { isMobile } = useWindowDimensions()
    const navigate = useNavigate()

    return (
        <div className='w-screen'>
            <div className='w-full text-center p-4 text-4xl font-bold text-[#3E4559]'>
                Hello, {user?.user_fname} {user?.user_lname}
            </div>
            <div className={`w-full p-4 grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
                <SelectionTile
                    title='Availabilities'
                    description='Manage the available dates and times to your users'
                    onClick={() => navigate('/manage/availabilities')}
                    color='linear-gradient(90deg, #23171D 0%, #282B2A 100%)'
                />
                <SelectionTile
                    title='Bookings'
                    description='Manage the bookings made by your users'
                    onClick={() => null}
                    color='linear-gradient(90deg, #2D3744 0%, #2A2E58 100%)'
                />
                <SelectionTile
                    title='Users'
                    description='Manage users and their permissions'
                    onClick={() => null}
                    color='linear-gradient(90deg, #1E5362 0%, #349488 100%)'
                />
            </div>
        </div>
    )
}