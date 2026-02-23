"use client";

import React from 'react'
import { TextRoll } from '@/components/ui/skiper-ui/skiper58'
import { ColorTheme } from '@/lib/theme'
import { geist } from '@/lib/fonts';
import { CrowdCanvas } from '@/components/ui/skiper-ui/skiper39';
import DynamicText from '@/components/kokonutui/dynamic-text';

const Hero = () => {
    const { textPrimary } = ColorTheme();

    return (
        <div
            style={{
                background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
            }}

            className={` relative  h-full  flex-col  w-full flex justify-center items-center `}>

            <div className={` px-4 md:px-0 w-full z-70 absolute top-24 md:top-18 flex flex-col items-center `}>
                <DynamicText>

                </DynamicText>
                <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6'>
                    <div className=' '>
                        <TextRoll className={` ${textPrimary} ${geist.className} text-amber-300 font-medium text-5xl md:text-7xl lg:text-8xl text-center `} center >
                            i&apos;m
                        </TextRoll>
                    </div>

                    <TextRoll className={` ${textPrimary} ${geist.className} font-medium text-5xl md:text-7xl lg:text-8xl text-center `} center >
                        ABHAY
                    </TextRoll>
                </div>



            </div>
            <div className="relative h-screen z-50 w-full">
                <CrowdCanvas src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png' rows={15} cols={7} />
            </div>




        </div>
    )
}

export default Hero
