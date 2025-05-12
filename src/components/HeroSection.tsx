import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { Separator } from "./ui/separator";

const HeroSection = () => {
  return (
    <div className="bg-secondary">
      <div className="container grid grid-cols-2 gap-3 py-[100px]">
        <div className="flex flex-col gap-[32px]">
          <h1 className="text-[64px] font-bold leading-none">
            Find Clothes That Matches Your Style
          </h1>
          <p className="text-base">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <Link
            href={"/products"}
            className={cn(buttonVariants(), "w-[210px] h-[52px]")}
          >
            Shop Now
          </Link>
          <div className="flex justify-between gap-[32px]">
            <div>
              <p className="text-[40px] leading-none">200+</p>
              <small>International Brands</small>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p className="text-[40px] leading-none">2000+</p>
              <small>Heigh-Quality Products</small>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p className="text-[40px] leading-none">300000+</p>
              <small>Happy Customers</small>
            </div>
          </div>
        </div>
        <div>
          <Image
            src={"/images/gf-ecommerce-hero.png"}
            width={500}
            height={400}
            alt="Hero Image"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
