import { marqueeData } from "@/constants";
import Marquee from "react-fast-marquee";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import { cn, dmSerifDisplay } from "@/lib/utils";

export default function Home() {
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full grid grid-cols-1 grid-rows-3 bg-gray-950">
        <Marquee className="h-full grid grid-cols-5" speed={10}>
          {marqueeData.map((i) => (
            <div className="w-[640px] h-[33.3vh] bg-red-200" key={i.id}>
              <img src={i.image} className="w-full h-full object-cover" />
            </div>
          ))}
        </Marquee>
        <Marquee
          className="h-full grid grid-cols-5"
          direction="right"
          speed={10}
        >
          {marqueeData.map((i) => (
            <div className="w-[640px] h-[33.3vh] bg-red-200" key={i.id}>
              <img src={i.image} className="w-full h-full object-cover" />
            </div>
          ))}
        </Marquee>
        <Marquee className="h-full grid grid-cols-5" speed={10}>
          {marqueeData.map((i) => (
            <div className="w-[640px] h-[33.3vh] bg-red-200" key={i.id}>
              <img src={i.image} className="w-full h-full object-cover" />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center items-center gap-4">
        <p className={cn("text-7xl", dmSerifDisplay.className)}>avio</p>
        <p className="text-sm text-zinc-500 text-center w-3/5">
          The place where your photos find meaning. Upload, explore, and connect
          through stunning visuals that speak louder than words.
        </p>
        <div className="flex items-center gap-4">
          <SignInButton mode="modal" forceRedirectUrl={"/home"}>
            <button className="w-[150px] justify-center items-center">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal" forceRedirectUrl={"/home"}>
            <button className="justify-center items-center gap-1 w-[150px] bg-black text-white">
              Get Started <ArrowRightIcon size={15} />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
