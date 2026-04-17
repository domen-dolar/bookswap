"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageInput = ({ reset }: { reset: boolean }) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const images = Array.from(files);
    const imageURLs = images.map((image) => URL.createObjectURL(image));

    setImagePreviews(imageURLs);
  };

  useEffect(() => {
    if (reset) {
      setImagePreviews([]);
    }
  }, [reset]);

  return (
    <div className="flex flex-col">
      <p>Slike knjige</p>
      <label htmlFor="images" className="btn text-center">
        Naloži slike
      </label>
      <input
        type="file"
        name="images"
        id="images"
        accept="image/*"
        multiple
        onChange={handleImageInput}
        required
        className="hide-input"
      />

      {imagePreviews.length > 0 && (
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation
          loop
          className="image-preview-swiper"
        >
          {imagePreviews.map((image) => (
            <SwiperSlide className="m-auto">
              <Image
                src={image}
                alt="predogled-slike"
                width={500}
                height={500}
                className="w-auto m-auto max-h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};
export default ImageInput;
