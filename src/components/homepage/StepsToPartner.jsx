import React from 'react'

const StepsToPartner = () => {

    const step = [
        {
            title: "Step 1",
            imgSrc:'/assets/images/home/partner_with_oyo_step_1.png',
            data:"Enter your details and we will call you to discuss the right solution for your asset"
        },
        {
            title: "Step 2",
            imgSrc:'/assets/images/home/partner_with_oyo_step_2.png',
            data:"Sign up with Amilo"
        },
        {
            title: "Step 3",
            imgSrc:'/assets/images/home/partner_with_oyo_step_3.png',
            data:"Onboard Amilo technology suite for hassle-free operations"
        }
    ]

  return (
    <>
        <div className='text-center py-14'>
            <h3 className='text-3xl font-bold'>Steps to Partner with Amilo</h3>
            <p className='text-1xl pb-10'>Onboarding with Amilo is a hassle-free three step process</p>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 pt-5 mx-10 text-center items-center'>
                {step.map((e,index)=>(
                    <div key={index} >
                        <img src={e.imgSrc} alt="" className='w-2/3 pb-8' />
                        <h2 className='font-bold pt-2 text-2xl'>{e.title}</h2>
                        <p className='text-1xs'>{e.data}</p>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default StepsToPartner