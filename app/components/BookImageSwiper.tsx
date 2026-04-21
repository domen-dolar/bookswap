"use client";

import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BookImageSwiper = ({ images }: { images: any[] }) => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation
      loop
      className="image-preview-swiper mt-0!"
    >
      {images.map((image: { url: string }) => (
        <SwiperSlide className="m-auto">
          <Image
            src={image.url}
            alt="predogled-slike"
            width={500}
            height={500}
            className="w-auto m-auto max-h-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default BookImageSwiper;
