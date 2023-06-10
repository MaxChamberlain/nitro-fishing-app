import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
    const [isScrolled, setScrolled] = useState(false);
    const { isMobile } = useWindowDimensions();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        
    }, []);

    useEffect(() => {
        if(isMobile || location.pathname !== '/') {
            setScrolled(true)
        }
    }, [isMobile, location, isScrolled])

    const handleScroll = () => {
        if(window.pageYOffset > 0) {
          setScrolled(true)
        } else {
          if(!isMobile || location.pathname !== '/') setScrolled(false)
        }
      }

    return(<>
        <motion.div className='fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-xl border-b border-stone-200 flex justify-center items-center px-2 z-[9999] bg-r' animate={{
            height: (isScrolled || isMobile) ? '3rem' : '16rem',
            justifyContent: 'center',
        }}>
            <div className='flex justify-between items-center' style={{
                width: (!isScrolled && !isMobile) ? '35rem' : '100%',
                height: '100%',
                flexWrap: (!isScrolled && !isMobile) ? 'wrap' : 'nowrap',
                justifyContent: (isScrolled || isMobile) ? 'space-between' : 'center',
            }}>
                <motion.div className='font-extrabold text-center whitespace-nowrap cursor-pointer'
                    style={{
                        color: 'var(--primary-color)',
                        fontSize: (isScrolled || isMobile) ? '1.5rem' : '3rem',
                    }}
                    layout
                    onClick={() => navigate('/')}
                >

                    {isMobile ? 'NITRO.' : 'NITRO FISHING TOURS.'}
                </motion.div>
                <motion.div style={{
                    minWidth: '3rem'
                }} layout
                    animate={{
                        opacity: location.pathname !== '/booking' ? 1 : 0,
                        y: location.pathname !== '/booking' ? 0 : -100,
                    }}
                    transition={{
                        duration: 0.2
                    }}
                >
                    {(isScrolled || isMobile) && location.pathname === '/' && <Button
                        variant='contained'
                        color='primary'
                        style={{
                            fontSize: '0.8rem',
                            backgroundColor: 'var(--primary-color)',
                            border: 'none',
                            color: 'white',
                            transition: 'all 0.2s ease-in-out',
                            whiteSpace: 'nowrap',
                            marginRight: '0.5rem'
                        }}
                        onClick={() => navigate('/manage')}
                    >
                        Manage
                    </Button>}
                    <Button
                        variant='contained'
                        color='primary'
                        style={{
                            fontSize: (isScrolled || isMobile) ? '0.8rem' : '1.5rem',
                            backgroundColor: (isScrolled || isMobile) ? 'var(--primary-color)' : 'white',
                            border: (isScrolled || isMobile) ? 'none' : '2px solid var(--primary-color)',
                            color: (isScrolled || isMobile) ? 'white' : 'var(--primary-color)',
                            transition: 'all 0.2s ease-in-out',
                            whiteSpace: 'nowrap',
                        }}
                        onClick={() => navigate('/booking')}
                    >
                        Book Now
                    </Button>
                </motion.div>
            </div>
        </motion.div>
        <motion.div animate={{
            height: (isScrolled || isMobile) ? '3rem' : '16rem',
            width: 1
        }}></motion.div>
    </>
    )
}