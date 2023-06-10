import fishingImage from '../assets/fishingImage.jpg'

export default function Home(){
    return(
        <div>
            <div className='main-img-wave-container w-full h-fit'>
                <img src={fishingImage} alt='fishingImage' className='w-full h-full object-cover brightness-75' />
            </div>
        </div>
    )
}