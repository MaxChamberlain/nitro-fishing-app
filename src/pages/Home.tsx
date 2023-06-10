import { Button } from '@mui/material'
import fishingImage from '../assets/fishingImage.jpg'
import useWindowDimensions from '../hooks/useWindowDimensions'

export default function Home(){
    const { isMobile } = useWindowDimensions()

    return(
        <div className='pb-56'>
            <div className='main-img-wave-container w-full h-fit relative z-[99]' style={{
                clipPath: isMobile ? 'none' : ''
            }}>
                <img src={fishingImage} alt='fishingImage' className='w-full h-full object-cover brightness-75' style={{
                    height: isMobile ? '100vh' : '',
                }} />
                <div className='w-full flex justify-center z-[9999] absolute top-1/3 left-1/2 -translate-x-1/2'>
                    <div className='flex flex-col items-center justify-center h-full p-4 w-fit z-[99] rounded-xl shadow-2xl mb-12 text-base md:text-xl text-white' style={{
                        maxWidth: isMobile ? '90vw' : '80rem',
                        backdropFilter: 'blur(8px) brightness(0.5)',
                        backgroundColor: isMobile ? 'rgba(0,0,0,0.75)' : ''
                    }}>
                        <div className='text-3xl font-bold text-center my-4'>
                            Welcome to Nitro Fishing Tours!
                        </div>
                        We are a partnership that loves
                        the thrill of fishing and creating lifelong memories. The founders of the
                        company and your guides are Mckennon Ty Bures and Logan Matthew
                        Todd. They have been partners for about 1 year. Their goal for your
                        trips is to help create those beautiful memories and get you on that fish
                        of a lifetime!
                    </div>
                </div>
            </div>
            <div className='w-11/12 ml-[4.1%] absolute z-[9999] flex p-4 gap-4 bg-white rounded-xl shadow-xl justify-center items-center' style={{
                marginTop: isMobile ? '-5rem' : '-20rem',
                flexDirection: isMobile ? 'column' : 'row',
            }}>
                <Button
                    variant='contained'
                    color='primary'
                    className='w-1/2'
                    onClick={() => window.location.href = 'https://license.gooutdoorsflorida.com/Licensing/CustomerLookup.aspx'}
                    fullWidth
                >
                    Get Your Saltwater License
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    className='w-1/2'
                    fullWidth
                >
                    View Pricing
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    className='w-1/2'
                    fullWidth
                >
                    Sign Your Waiver
                </Button>
            </div>
        </div>
    )
}