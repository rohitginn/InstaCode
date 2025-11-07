import { SignupForm } from '@/Components/signup-form'
import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'

const Signup = () => {
    return (
        <div className=" bg-[#262626] text-white flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="font-inter flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    InstaCode
                </a>
                <SignupForm />
            </div>
        </div>
    )
}

export default Signup