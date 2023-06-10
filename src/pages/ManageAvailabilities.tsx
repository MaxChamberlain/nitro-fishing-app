import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers-pro";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Alert, Button, Dialog, LinearProgress, Snackbar } from "@mui/material";
import { motion } from "framer-motion";
import { getAvailabilities } from "../api/booking";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NewAvailablity from "../components/Manage/NewAvailability";
import Availablity from "../components/Manage/Availability";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

export default function ManageAvailabilities(){
    const { isMobile } = useWindowDimensions();
    const [selectedDate, setSelectedDate] = useState<string>((new Date().toLocaleDateString('en-US')));
    const [loading, setLoading] = useState(false);
    const [availabilities, setAvailabilities] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const [selectedBooking, setSelectedBooking] = useState<any>(null);

    const navigate = useNavigate()
    
    useEffect(() => {
        setLoading(true)
        getAvailabilities().then(e => {
            setAvailabilities(e)
            setLoading(false)
        })
    }, [])
    
    return(
            <motion.div className='w-screen flex justify-center items-center' style={{
                padding: isMobile ? '0' : '1rem',
                paddingBottom: 140,
                minHeight: 'calc(100vh - 3rem)'
            }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ duration: 0.2 }}
            >
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => navigate('/manage')}
                    style={{
                        position: 'fixed',
                        bottom: 20,
                        left: 20,
                        zIndex: 1000,
                        borderRadius: '100%',
                        aspectRatio: '1/1',
                        color: 'black',
                        backgroundColor: 'white',
                        border: 'none',
                        boxShadow: '0 0 10px 5px rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0
                    }}
                    >
                        <ArrowBackIosNewIcon style={{ fontSize: '2rem' }} />
                    </Button>
                <motion.div className='bg-white border-stone-200 rounded-xl flex flex-col justify-start items-center gap-4' style={{
                    borderWidth: isMobile ? '0' : '1px',
                    width: isMobile ? '100%' : '1100px',
                }} layout>
                    <div className='flex justify-start items-center gap-4' style={{
                        padding: isMobile ? '0' : '4rem',
                        flexDirection: 'column',
                        height: isMobile ? 'auto' : '30rem',
                        maxWidth: 1100
                    }}
                    >
                        <div>
                            <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={{ start: 'Start', end: 'End' }}
                            >
                                <StaticDatePicker
                                    value={dayjs(selectedDate)}
                                    orientation='portrait'
                                    onChange={(newValue) => {
                                        if(newValue === null) return
                                        setSelectedDate(newValue.format('MM/DD/YYYY'));
                                    }}
                                    sx={{
                                        '& .MuiPickersDay-root': {
                                            border: '1px solid #eee'
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className=' h-px w-full bg-stone-200'></div>
                    <TransitionGroup className='w-full'>
                        {loading
                            ? <CSSTransition timeout={200} in={true} classNames='fade w-full p-4'>
                                <div className='p-4 w-full flex items-center justify-center'>
                                    <LinearProgress sx={{
                                        width: '100%',
                                        height: 6,
                                    }} />
                                </div>
                            </CSSTransition>
                            : <CSSTransition timeout={200} in={true} classNames='fade w-full p-4'>
                                <div className='p-4 w-full flex flex-col gap-4'>
                                    <NewAvailablity selectedDate={selectedDate} setAvailabilities={setAvailabilities} setError={setError} />
                                    {availabilities.filter((e: any) => new Date(e.date).toLocaleDateString('en-US') === new Date(selectedDate).toLocaleDateString('en-US')).map((e: any, i: number) => {
                                        return(
                                            <Availablity key={i} data={e} setSelectedBooking={setSelectedBooking} />
                                        )
                                    })}
                                </div>
                            </CSSTransition>
                        }
                    </TransitionGroup>
                </motion.div>
                <Dialog 
                    open={Boolean(selectedBooking)} 
                    onClose={() => setSelectedBooking(null)} 
                    fullWidth
                >
                    {selectedBooking === 'loading'
                        ? <div className='p-4 flex items-center justify-center bg-white'>
                            <LinearProgress sx={{
                                width: '100%',
                                height: 6,
                            }} />
                        </div>
                        : <div className='p-4 flex items-start flex-col gap-4 justify-center bg-white' style={{
                            width: '100%'
                        }}>
                            <div className='text-xl text-center w-full font-thin text-stone-700'>
                                Booking For:
                            </div>  
                            <div className='text-xl text-center w-full font-bold text-stone-700'>
                                {new Date(selectedBooking?.date).toLocaleDateString('en-US', { weekday: 'long',  month: 'long', day: 'numeric', year: 'numeric' })}
                            </div>
                            <div className='text-xl text-center w-full font-bold text-stone-700'>
                                At {selectedBooking?.time}
                            </div>
                            <div className='text-lg text-stone-700 p-4 border border-stone-200 rounded-xl w-full relative'>
                                <div className='absolute -top-4 text-sm left-4 bg-white p-1 text-stone-500'>Customer Name</div>
                                {selectedBooking?.user_fname} {selectedBooking?.user_lname}
                            </div>
                            <div className='text-lg text-stone-700 p-4 border border-stone-200 rounded-xl w-full relative flex justify-between cursor-pointer' onPointerDown={() => {
                                navigator.clipboard.writeText(selectedBooking?.user_email)
                                document.getElementById('copy-1')?.classList.add('hidden')
                                document.getElementById('check-1')?.classList.remove('hidden')
                                document.getElementById('email-1')?.classList.add('opacity-50')
                                setTimeout(() => {
                                    document.getElementById('copy-1')?.classList.remove('hidden')
                                    document.getElementById('check-1')?.classList.add('hidden')
                                    document.getElementById('email-1')?.classList.remove('opacity-50')
                                }, 1000)
                            }}>
                                <div className='absolute -top-4 text-sm left-4 bg-white p-1 text-stone-500'>Customer Email</div>
                                <span style={{
                                    transition: 'all 0.2s ease-in-out'
                                }} id='email-1'>
                                    {selectedBooking?.user_email}
                                </span>
                                <div id='copy-1'>
                                    <ContentCopyIcon />
                                </div>
                                <div id='check-1' className="hidden">
                                    <CheckIcon />
                                </div>
                            </div>
                            <div className='text-lg text-stone-700 p-4 border border-stone-200 rounded-xl w-full relative flex justify-between cursor-pointer' onPointerDown={() => {
                                navigator.clipboard.writeText(selectedBooking?.user_phone)
                                document.getElementById('copy-2')?.classList.add('hidden')
                                document.getElementById('check-2')?.classList.remove('hidden')
                                document.getElementById('email-2')?.classList.add('opacity-50')
                                setTimeout(() => {
                                    document.getElementById('copy-2')?.classList.remove('hidden')
                                    document.getElementById('check-2')?.classList.add('hidden')
                                    document.getElementById('email-2')?.classList.remove('opacity-50')
                                }, 1000)
                            }}>
                                <div className='absolute -top-4 text-sm left-4 bg-white p-1 text-stone-500'>Customer Phone</div>
                                <span style={{
                                    transition: 'all 0.2s ease-in-out'
                                }} id='email-2'>
                                    {selectedBooking?.user_phone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                                </span>
                                <div id='copy-2'>
                                    <ContentCopyIcon />
                                </div>
                                <div id='check-2' className="hidden">
                                    <CheckIcon />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 mt-12'>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Complete
                                </Button>
                            </div>
                        </div>
                    }
                </Dialog>

                <Snackbar open={error !== null} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            </motion.div>
    )
}