import { CircularProgress } from '@mui/material';
import useWindowDimensions from '../../../hooks/useWindowDimensions';

export default function Step3({
    bookingDetails,
}: {
    bookingDetails: any
}){
    const { isMobile } = useWindowDimensions();
    console.log(bookingDetails)
    return(
        bookingDetails
        ? <div className='bg-white border-stone-200 rounded-xl flex flex-col justify-start items-center gap-4' style={{
                borderWidth: isMobile ? '0' : '1px',
                width: isMobile ? '100%' : '1100px',
                padding: isMobile ? '0' : '4rem 0',
            }}>
                <div className='w-full text-center font-semibold text-lg'>
                    {bookingDetails.message}
                </div>
            </div>
        : <div className='bg-white border-stone-200 rounded-xl flex flex-col justify-start items-center gap-4' style={{ 
                borderWidth: isMobile ? '0' : '1px',
                width: isMobile ? '100%' : '1100px',
                padding: isMobile ? '0' : '4rem 0',
            }}>
                <CircularProgress />
            </div>
    )
}