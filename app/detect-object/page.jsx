import Link from 'next/link'
import Detector from '@/components/Detector'

const ObjectDetection = () => {
  return (
    <div>
       <div className='w-[100%]  flex p-[10px] bg-gray-700 mb-[100px] justify-start relative'>
        <Link href={"/"}>
            <h3 className='text-4xl hover:text-orange-100'>Back</h3>
        </Link>
            
        </div> 

        <div className='flex justify-center w-[100vw] text-center align-middle flex-col gap-[50px]'>

            <h2 className='text-5xl'>ObjectDetection</h2>
            <Detector/>

        </div>
        
        
        
    </div>
  )
}

export default ObjectDetection