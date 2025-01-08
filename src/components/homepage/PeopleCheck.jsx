import React from 'react'

const PeopleCheck = () => {
    return (
        <div className='bg-check bg-cover bg-no-repeat py-20 md:py-[90px] lg:py-24'>
            <div className="max-w-[1200px] px-4 mx-auto xl:px-0 flex justify-center lg:justify-start">
                <div className="max-w-[360px] p-6 rounded bg-white shadow-sm">
                    <div className="flex gap-4 pb-8 border-b items-center border-gray-500">
                        <h3 className='text-5xl md:text-6xl font-bold leading-none'>5</h3>
                        <p className='text-base md:text-md  leading-none'>People Check Into AmiloAi Every Second</p>
                    </div>
                    <div className="pt-8">
                        <p className='text-base md:text-md leading-none pb-6'>Every stay is a curated experience of the good life.</p>
                        <button className="px-8 py-2.5 w-full md:py-3 bg-green-500 hover:bg-green-600 text-white text-base md:text-lg font-semibold rounded-lg transition">
                            REQUEST A CALL
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PeopleCheck