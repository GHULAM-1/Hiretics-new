'use client'

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, UploadCloud, RotateCcw, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link2 } from 'lucide-react';
import Link from "next/link"

export default function JobDetailsPage() {
  return (
    <div className="flex w-full max-w-[1440px] mx-auto px-4 lg:px-8">
      <div className="flex-1 space-y-6">
        
        <Alert className="bg-[#DCFCE7] border border-green-200 text-green-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
            <Eye/>
          <AlertDescription className="font-medium"> Viewing as an applicant.</AlertDescription>
          </div>
          <Button variant="outline" size="sm" className="bg-black text-white">
            Go back
          </Button>
        </Alert>
        <Link href="/">
        <div className="text-[#16A34A] text-3xl font-extrabold lg:hidden border-b pb-3 border-[#E4E4E7]">
            Hiretics
        </div>
        </Link>
        <div className="flex justify-between items-start pt-10">
          <div >
            <h1 className="text-[24 px] md:text-3xl text-[#09090B] font-[600]">Looking for a Web Developer</h1>
            <p className="text-[#52525B] font-normal mt-3 text-[16px]">Job Description</p>
          </div>
          <Button variant="ghost" size="icon" className="border rounded-full">
            <Link2 className="w-[40px] h-[40px]" />
          </Button>
        </div>

      
        <p className="text-sm text-[#09090B] leading-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt temporibus laudantium aliquam voluptatum nihil, minus fugit eveniet? Maxime veritatis deserunt repudiandae dicta pariatur accusamus, enim magnam eligendi facere aliquam cumque minus, optio corporis voluptas tenetur maiores dignissimos delectus neque soluta esse. Excepturi, id sequi repellendus corrupti eos doloribus perspiciatis maxime. Expedita accusantium sit quos quaerat enim. Optio maxime tempora est corrupti eaque quisquam distinctio consequuntur accusamus nihil explicabo. Sed accusamus quis dignissimos sapiente tempore blanditiis necessitatibus aspernatur, mollitia molestiae quaerat alias corporis! Perferendis, sequi blanditiis tempora reiciendis aliquam natus ipsam aut sunt quas nesciunt aliquid laudantium quo laboriosam odio, veniam adipisci reprehenderit eligendi voluptatibus accusantium in rerum, officia laborum fugiat! Quasi placeat quam eum dolore laboriosam! Deserunt maiores nisi modi iusto voluptas dignissimos voluptatem molestias molestiae enim porro veritatis cupiditate officia aut perferendis nobis cum suscipit optio minima veniam, libero et magni alias! Maxime, praesentium. Quia ullam dolores illum minima doloremque, dolorum eum perferendis? Placeat dignissimos ipsa laudantium eum distinctio, ipsum officia id iure deserunt. Maxime, deserunt perspiciatis. Ut quibusdam eveniet pariatur dicta quis praesentium dolore, impedit eum dolores molestias corrupti ab aperiam! Deleniti, quas enim unde dignissimos labore quae, hic a quisquam, corporis qui repellat nihil ea consequatur perspiciatis.
        </p>

      
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">BitProwler</span>
        </div>

       
        <div>
          <Button className="w-full bg-black text-white hover:bg-gray-900">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload CV
          </Button>
          <p className="text-xs text-muted-foreground mt-1">list of supported CV formats</p>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-muted-foreground">
            Accept terms and condition <br />
            <span className="text-xs">
              You agree to our{" "}
              <a href="#" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
