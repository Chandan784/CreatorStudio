import Image from "next/image";
import { STEP_CARD_LIST } from "../common/Helper";

const StepsToPartner = () => {
<<<<<<< HEAD
  return (
    <>
      <div className="text-center py-16 md:py-[70px] lg:py-20 max-w-[1200px] px-4 xl:px-0 mx-auto">
        <h3 className="text-3xl font-bold">Steps to Partner with Amilo</h3>
        <p className="md:text-lg text-base pb-10">
          Onboarding with Amilo is a hassle-free three step process
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-6 pt-5 text-center items-center">
          {STEP_CARD_LIST.map((obj, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image src={obj.imgSrc} alt="dummy" height={300} width={300} />
              <img src={obj.imgSrc} alt="" className="w-2/3 pb-8" />
              <h2 className="font-bold pt-2 text-2xl">{obj.title}</h2>
              <p className="text-xs md:text-base text-black text-opacity-70">
                {obj.data}
              </p>
=======
    return (
        <>
            <div className='text-center py-16 md:py-[70px] lg:py-20 max-w-[1200px] px-4 xl:px-0 mx-auto'>
                <h3 className='text-3xl font-bold'>Steps to Partner with Amilo</h3>
                <p className='md:text-lg text-base pb-10'>Onboarding with Amilo is a hassle-free three step process</p>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-6 pt-5 text-center items-center'>
                    {STEP_CARD_LIST.map((obj, index) => (
                        <div key={index} className='flex flex-col items-center' >
                            <Image src={obj.imgSrc} alt='dummy' height={300} width={300} className='max-w-[200px] mx-auto' />
                            <h2 className='font-bold pt-2 text-2xl'>{obj.title}</h2>
                            <p className='text-xs md:text-base text-black text-opacity-70'>{obj.data}</p>
                        </div>
                    ))}
                </div>
>>>>>>> a288be371c1cd60fe305e0f6ba79582dc95e9692
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StepsToPartner;
