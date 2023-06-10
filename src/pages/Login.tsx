import { Button, TextField } from "@mui/material"
import { useState } from "react"
import { authUserLogin } from "../api/user"

export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div className='w-screen h-screen absolute top-0 left-0 flex items-center justify-center'>
            <div className='w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col items-center relative'>
                <div className='text-3xl font-extrabold text-center mb-12 mt-4'>Login</div>
                <TextField type='text' placeholder='Email' className='w-80 h-12' style={{ marginBottom: '2rem' }} value={email} onChange={e => setEmail(e.target.value)} InputLabelProps={{ shrink: true }} />
                <TextField type='password' placeholder='Password' className='w-80 h-12' value={password} onChange={e => setPassword(e.target.value)} InputLabelProps={{ shrink: true }} />
                <Button
                    variant='contained'
                    color='primary'
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        left: '1rem'
                    }}
                    disabled={!email || !password}
                    onClick={() => {
                        authUserLogin(email.toLowerCase(), password)
                    }}
                >Login</Button>
            </div>
        </div>
    )
}