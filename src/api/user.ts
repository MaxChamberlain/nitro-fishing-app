import axios from './AxiosInstanceConfig'

export const getUserDetails = async (): Promise<any> => {
    try {
      const { data } = await axios.get('/auth/user')
      return data
    } catch (e: any) {
      console.log(e)
    }
    return;
}

export const authUserLogin = async ( user_email: string, user_password: string) => {
    try{
        const data = await axios.post('/auth/login',
            {
                user_email, 
                user_password
            }
        )
        localStorage.setItem('Authorization', data.headers.authorization);
        const urlParams = new URLSearchParams(window.location.search);
        const redirect_url = urlParams.get('redirect_url');
        if(redirect_url){
            window.location.href = redirect_url;
        }else{
            window.location.href = '/';
        }
    }catch(e: any){
        console.log(e);
    }
}