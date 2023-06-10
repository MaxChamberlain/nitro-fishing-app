import { motion } from 'framer-motion';
import { CSSTransition } from 'react-transition-group';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import { Button, TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CheckIcon from '@mui/icons-material/Check';
import { createBooking } from '../../../api/booking';

export default function Step2({
    setStep,
    selectedAvailability,
    user,
    setUser,
    setBooking,
}:{
    setStep: any
    selectedAvailability: any
    user: any
    setUser: any
    setBooking: any
}){
    const { isMobile } = useWindowDimensions();
    return(<>
        <CSSTransition timeout={200} classNames='fade-side-slide' in={true}>
            <div className='bg-white border-stone-200 rounded-xl flex flex-col justify-start items-center gap-4' style={{
                borderWidth: isMobile ? '0' : '1px',
                width: isMobile ? '100%' : '1100px',
                padding: isMobile ? '0' : '4rem 0',
            }}>
                <div className='w-full text-center font-semibold text-2xl'>
                    Your Booking For
                </div>
                <motion.div className='w-full text-center font-bold text-2xl pb-12'
                    animate={{
                        width: selectedAvailability ? '100%' : 20,
                    }}
                    transition={{
                        duration: 0.4
                    }}
                    layout
                    layoutId='selected-availability'
                >
                        <span className='flex items-center gap-2 justify-center'><WatchLaterIcon />{`${new Date(selectedAvailability.date).toString().split(' ').slice(0,3).join(' ')},  ${selectedAvailability.time}`}</span>
                </motion.div>
                <div className='flex flex-col items-center gap-4 w-full px-4'>
                    <div className='flex justify-center gap-4 w-full'>
                        <TextField
                            label='First Name'
                            variant='outlined'
                            value={user.firstName}
                            onChange={(e) => setUser({...user, firstName: e.target.value})}
                            fullWidth
                            InputLabelProps={{ shrink: true }} 
                            required
                        />
                        <TextField
                            label='Last Name'
                            variant='outlined'
                            value={user.lastName}
                            onChange={(e) => setUser({...user, lastName: e.target.value})}
                            fullWidth
                            InputLabelProps={{ shrink: true }} 
                            required
                        />
                    </div>
                    <TextField
                        label='Email Address'
                        variant='outlined'
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        fullWidth
                        InputLabelProps={{ shrink: true }} 
                        required
                    />
                    <TextField
                        label='Phone'
                        variant='outlined'
                        value={user.phone}
                        onChange={(e) => setUser({...user, phone: e.target.value})}
                        fullWidth
                        InputLabelProps={{ shrink: true }} 
                        required
                    />
                </div>
            </div>
        </CSSTransition>
        <motion.div className='flex w-full z-[9999]' 
            style={{
                position: isMobile ? 'fixed' : 'relative',
                bottom: 0,
                left: 0,
                columnGap: isMobile ? '0' : '1rem',
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
                    backgroundColor: '#bbb',
                    marginTop: '2rem',             
                }}
                disabled={!selectedAvailability}
                onClick={() => {
                    if(!selectedAvailability) return
                    window.scrollTo(0,0);
                    setStep(0);
                }}
                fullWidth
            >
                <ArrowBackIosIcon /> Back
            </Button>
            <Button
                variant='contained'
                color='primary'
                style={{
                    borderRadius: isMobile ? '0' : '',
                    height: '4rem',
                    marginTop: '2rem',             
                }}
                disabled={!selectedAvailability || !user.firstName || !user.lastName || !user.email || !user.phone}
                onClick={() => {
                    if(!selectedAvailability || !user.firstName || !user.lastName || !user.email || !user.phone) return
                    window.scrollTo(0,0);
                    createBooking(selectedAvailability.id, user).then(e => {
                        setBooking(e);
                    })
                    setStep(2);
                }}
                fullWidth
            >
                <CheckIcon />Book
            </Button>
        </motion.div>
    </>
    )
}