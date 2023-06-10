import { useEffect, useState } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { motion } from 'framer-motion';
import { getAvailabilities } from '../api/booking';
import { TransitionGroup } from 'react-transition-group';
import Step1 from '../components/Booking/steps/Step1';
import Step2 from '../components/Booking/steps/Step2';
import Step3 from '../components/Booking/steps/Step3';

export default function Booking() {
    const [selectedDate, setSelectedDate] = useState<string>((new Date().toLocaleDateString('en-US')));
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const { isMobile } = useWindowDimensions();
    const [availabilities, setAvailabilities] = useState<any>([]);
    const [selectedAvailability, setSelectedAvailability] = useState<{
        date: string
        time: string,
        available: boolean
    } | null>(null);
    const [user, setUser] = useState<any>({});
    const [booking, setBooking] = useState<any>({});

    useEffect(() => {
        setLoading(true)
        getAvailabilities().then(e => {
            setAvailabilities(e)
            setLoading(false)
        })
    }, [])

    const steps = [
        () => <Step1 selectedDate={selectedDate} setSelectedDate={setSelectedDate} loading={loading} availabilities={availabilities} setStep={setStep} selectedAvailability={selectedAvailability} setSelectedAvailability={setSelectedAvailability} />,
        () => <Step2 setStep={setStep} selectedAvailability={selectedAvailability} user={user} setUser={setUser} setBooking={setBooking} />,
        () => <Step3 bookingDetails={booking} />
    ]

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
            <TransitionGroup>
                {steps[step]()}
            </TransitionGroup>
        </motion.div>
    )
}