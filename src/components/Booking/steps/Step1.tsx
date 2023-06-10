import dayjs from 'dayjs';
import { LocalizationProvider, StaticDatePicker   } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Button, Chip, CircularProgress, Divider } from '@mui/material';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function Step1({
    selectedDate,
    setSelectedDate,
    loading,
    availabilities,
    setStep,
    selectedAvailability,
    setSelectedAvailability
}:{
    selectedDate: string,
    setSelectedDate: Function,
    loading: boolean,
    availabilities: any
    setStep: any
    selectedAvailability: any
    setSelectedAvailability: any
}){
    const { isMobile } = useWindowDimensions();

    return(<>
        <CSSTransition timeout={200} classNames='fade-side-slide' in={true}>
            <div className='bg-white border-stone-200 rounded-xl flex flex-col justify-start items-center gap-4' style={{
                borderWidth: isMobile ? '0' : '1px',
                width: isMobile ? '100%' : '1100px',
            }}>
                <div className='flex justify-start items-center gap-4' style={{
                    padding: isMobile ? '0' : '4rem',
                    flexDirection: isMobile ? 'column' : 'row',
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
                    {isMobile
                        ? <div className='my-4 h-px w-full bg-stone-200'></div>
                        : <Divider style={{
                            margin: '0 3rem',
                        }} orientation='vertical' flexItem />
                    }
                    <div className='h-full relative' style={{
                        height: '100%',
                        width: isMobile ? '100%' : 500,
                    }}>
                        <TransitionGroup>
                            {loading    
                                ? <CSSTransition timeout={200} classNames='fade'>
                                    <div className='w-full h-full flex justify-center items-center absolute'>
                                        <CircularProgress />
                                    </div>
                                </CSSTransition>
                                : availabilities.filter((e: any) => new Date(e.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()).length > 0 
                                    ? availabilities.filter((e: any) => new Date(e.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()).map((availability: any, index: number) => {
                                        return(
                                            <CSSTransition key={index} timeout={(100 * index)} classNames='fade' in={true}>
                                                <div
                                                    className='inline'
                                                >
                                                    <Chip
                                                        key={index}
                                                        label={availability.time}
                                                        variant='outlined'
                                                        style={{
                                                            margin: '0.5rem',
                                                            color: availability.available ? 'white' : '#ccc',
                                                            backgroundColor: availability.available ? '#1974D0' : 'white',
                                                            border: availability.available ? 'none' : '1px solid #ccc',
                                                            cursor: availability.available ? 'pointer' : 'not-allowed',
                                                            transition: 'all 0.2s ease-in-out',
                                                            opacity: (selectedAvailability && (selectedAvailability?.time !== availability.time || selectedAvailability?.date !== availability.date)) ? 0.5 : 1
                                                        }}
                                                        onClick={() => {
                                                            if(!availability.available) return
                                                            if(selectedAvailability?.time === availability.time && selectedAvailability?.date === availability.date) return setSelectedAvailability(null)
                                                            else setSelectedAvailability(availability);
                                                        }}
                                                    />
                                                </div>
                                            </CSSTransition>
                                        )
                                    })
                                    : <CSSTransition timeout={200} classNames='fade'>
                                        <div className='flex justify-center items-center h-full'>
                                            <span className='text-2xl font-bold text-stone-300'>No availabilities</span>
                                        </div>
                                    </CSSTransition>
                            }
                        </TransitionGroup>
                    </div>
                </div>
                <motion.div className='h-px text-center font-bold text-2xl pb-12 pt-6 border-t border-stone-200 whitespace-nowrap w-fit'
                    transition={{
                        duration: 0.4
                    }}
                    layout
                    layoutId='selected-availability'
                >
                    {selectedAvailability
                        ? <span className='flex items-center gap-2 justify-center'><WatchLaterIcon />{`${new Date(selectedAvailability.date).toString().split(' ').slice(0,3).join(' ')},  ${selectedAvailability.time}`}</span>
                        : '--'
                    }
                </motion.div>
            </div>
        </CSSTransition>
        <motion.div className='flex w-full' 
            style={{
                position: isMobile ? 'fixed' : 'relative',
                bottom: 0,
                left: 0
            }}
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.4,
                delay: 0.2
            }}
            layout
        >
            <Button
                variant='contained'
                color='primary'
                style={{
                    borderRadius: isMobile ? '0' : '',
                    height: '4rem',
                    backgroundColor: selectedAvailability ? '' : '#ccc',       
                    marginTop: '2rem',        
                }}
                disabled={!selectedAvailability}
                onClick={() => {
                    if(!selectedAvailability) return
                    setStep(1);
                }}
                fullWidth
            >
                Continue <ArrowBackIosIcon style={{ transform: 'rotate(180deg)' }} />
            </Button>
        </motion.div>
    </>)
}