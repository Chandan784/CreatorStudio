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
            data:"Sign up with OYO"
        },
        {
            title: "Step 3",
            imgSrc:'/assets/images/home/partner_with_oyo_step_3.png',
            data:"Onboard OYO's technology suite for hassle-free operations"
        }
    ]

  return (
    <>
        <div className='text-center py-14'>
            <h3 className='text-3xl font-bold'>Steps to Partner with OYO</h3>
            <p className='text-1xl pb-10'>Onboarding with OYO is a hassle-free three step process</p>
            <div className='grid grid-cols-3 gap-10 pt-5 mx-10'>
                {step.map((e,index)=>(
                    <div key={index} className='text-center items-center'>
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