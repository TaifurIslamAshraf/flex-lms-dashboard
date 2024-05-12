import { TypographyH4 } from "@/components/ui/Typography";

import Image from "next/image";

const BestSellingProducts = () => {
  return (
    <div className="shadow-md w-full bg-white p-6 rounded-md grid grid-cols-1 gap-3 ">
      <TypographyH4>Top Selling Products</TypographyH4>

      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <TypographyH4>This is products </TypographyH4>
            <TypographyH4>Category Name </TypographyH4>
          </div>
        </div>
        <div className="">
          <TypographyH4> 452</TypographyH4>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <TypographyH4>This is products </TypographyH4>
            <TypographyH4>Category Name </TypographyH4>
          </div>
        </div>
        <div className="">
          <TypographyH4> 452</TypographyH4>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <TypographyH4>This is products </TypographyH4>
            <TypographyH4>Category Name </TypographyH4>
          </div>
        </div>
        <div className="">
          <TypographyH4> 452</TypographyH4>
        </div>
      </div>
      <div className="flex justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="image"
            width={10}
            height={10}
          />

          <div className="">
            <TypographyH4>This is products </TypographyH4>
            <TypographyH4>Category Name </TypographyH4>
          </div>
        </div>
        <div className="">
          <TypographyH4> 452</TypographyH4>
        </div>
      </div>
    </div>
  );
};

export default BestSellingProducts;
