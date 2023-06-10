import { Divider } from "@mui/material";
import { motion } from "framer-motion";
import { getBooking } from "../../api/booking";

export default function Availablity({ 
    data,
    setSelectedBooking
}: {
    data: any
    setSelectedBooking: any
}){
    return(
        <motion.div className='w-full p-4 rounded-xl border border-stone-200 flex justify-between relative'
            whileHover={{ backgroundColor: '#f5f5f5', borderColor: 'hsl(220, 100%, 60%)' }}
            style={{
                backgroundColor: data.available ? '#fff' : '#ccc',
                cursor: !data.available ? 'pointer' : 'default'
            }}
            onClick={() => {
                if(!data.available) {
                    setSelectedBooking('loading')
                    getBooking(data.bookingId).then(res => {
                        setSelectedBooking(res.data.booking)
                    })
                }
            }}
        >
            <div className='whitespace-nowrap'>{data.time} {!data.available && ' - Click to view booking details'}</div>
            <div className='w-fit grid grid-cols-2 gap-4 items-center'>
                {data.available && <Divider orientation='vertical' />}
                {data.available
                    && <div className='flex w-32 text-center'>
                        <div className='ml-4'>Available</div>
                        <div className='bg-blue-500 rounded-full w-2 h-2'></div>
                    </div>
                }
            </div>
        </motion.div>
    )
}