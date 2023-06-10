export default function SelectionTile({
    title,
    description,
    color,
    onClick
}: {
    title: string,
    description: string,
    color: string,
    onClick: () => void
}){
    return(
        <div className='w-full flex flex-col items-center justify-center cursor-pointer p-4 rounded-xl shadow h-48' onClick={onClick} style={{
            background: color
        }}>
            <div className='flex flex-col items-center justify-center gap-4'>
                <span className='text-2xl font-bold text-white'>{title}</span>
                <span className='text-lg text-white'>{description}</span>
            </div>
        </div>
    )
}