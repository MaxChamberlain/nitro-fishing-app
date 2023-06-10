import axios from './AxiosInstanceConfig'

export const getAvailabilities = async () => {
    const { data } = await axios.get('/availabilities')
    return data
}

export const createAvailability = async (date: string, time: string, available: boolean) => {
    let error = null
    const { data } = await axios.post('/availabilities', {
        date,
        time,
        available
    }).catch(e => {
        error = (e.response)
        return e
    })
    console.log(error)
    if(data) return data
    else return error
}

export const createBooking = async (availabilityId: any, user: any) => {
    const { data } = await axios.post('/bookings', {
        availabilityId,
        user
    })
    return data
}

export const getBooking = async (bookingId: string) => {
    const { data } = await axios.get(`/bookings/${bookingId}`)
    return data
}