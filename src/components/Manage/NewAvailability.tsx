import { Button, Dialog } from "@mui/material";
import { LocalizationProvider, DesktopTimePicker  } from "@mui/x-date-pickers-pro";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createAvailability, getAvailabilities } from "../../api/booking";
import { motion } from "framer-motion";

export default function NewAvailablity({
    selectedDate,
    setAvailabilities,
    setError
}: {
    selectedDate: string,
    setAvailabilities: any
    setError: any
}){
    const [ adding, setAdding ] = useState(false)
    const [ newAvailability, setNewAvailability ] = useState({ date: selectedDate, time: '' })
    const [ submitted, setSubmitted ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    return(
        <div>
            <Button
                variant='contained'
                color='primary'
                style={{
                    borderRadius: '0.5rem',
                    height: '100%',
                    width: '100%',
                }}
                onClick={() => setAdding(true)}
            >
                Add
            </Button>
            <Dialog
                open={adding}
                onClose={() => setAdding(false)}
            >
                {!submitted
                    ? <motion.div className='p-4 bg-white rounded-2xl shadow-2xl flex flex-col items-center relative' layout layoutId='modal'>
                        <div className='text-3xl font-extrabold text-center mt-4'>Add Availability For...</div>
                        <div className='text-2xl font-bold text-center mb-12 mt-8'>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long',  month: 'long', day: 'numeric' })}</div>
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            localeText={{ start: 'Start', end: 'End' }}
                        >
                            <DesktopTimePicker 
                                label="Availability Time"
                                value={newAvailability.time}
                                onChange={(time: any) => setNewAvailability({ ...newAvailability, time: time })}
                            />
                        </LocalizationProvider>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{
                                marginTop: '2rem'
                            }}
                            disabled={!newAvailability.time}
                            fullWidth
                            onClick={() => {
                                const submitObject = {
                                    ...newAvailability,
                                    time: new Date(newAvailability.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                }
                                setSubmitted(true)
                                setLoading(true)
                                createAvailability(submitObject.date, submitObject.time, true).then(e => {
                                    if(e?.status && e.status === 400){
                                        setError(e.data.message)
                                        setAdding(false)
                                        setSubmitted(false)
                                        setNewAvailability({ date: selectedDate, time: '' })
                                        setLoading(false)
                                        getAvailabilities().then(e => {
                                            setAvailabilities(e)
                                        })
                                        return
                                    } else{
                                        setSubmitted(true)
                                        setLoading(false)
                                        getAvailabilities().then(e => {
                                            setAvailabilities(e)
                                        })
                                    }
                                })
                            }
                        }>Add</Button>
                    </motion.div>
                    : <motion.div className='p-4 bg-white rounded-2xl shadow-2xl flex flex-col items-center relative' layout layoutId='modal'>
                        <div className='text-3xl font-extrabold text-center mt-4'>Adding Availability For...</div>
                        <div className='text-2xl font-bold text-center mb-12 mt-8'>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long',  month: 'long', day: 'numeric' })}</div>
                        <div className='text-2xl font-bold text-center mb-12 mt-8'>{new Date(newAvailability.time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</div>
                        <Button
                            variant='contained'
                            color='primary'
                            style={{
                                marginTop: '2rem'
                            }}
                            disabled={loading}
                            onClick={() => {
                                setAdding(false)
                                setSubmitted(false)
                                setNewAvailability({ date: selectedDate, time: '' })
                            }}
                            fullWidth
                        >{loading ? 'Adding...' : 'Added. Click to close'}</Button>
                    </motion.div>
                        
                }
            </Dialog>
        </div>
    )
}