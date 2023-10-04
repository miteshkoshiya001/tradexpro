import Image from "next/image";
import { useEffect, useState } from "react";

const ImageComponent = ({
  src,
  alt = "Image",
  width = 500,
  height = 500,
  layout = "responsive",
  objectFit = "cover",
  objectPosition = "center",
  priority = false,
  loading = "lazy",
  quality = 75,
  blurDataURL = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20500%20500%22%20fill%3D%22none%22%20stroke%3D%22%23DDD%22%20stroke-width%3D%2220%22%20stroke-dasharray%3D%2215%2C10%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Ccircle%20cx%3D%22250%22%20cy%3D%22250%22%20r%3D%22235%22%2F%3E%3C%2Fsvg%3E",
  className,
}: any) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      loader={() => imgSrc}
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
      objectFit={objectFit}
      objectPosition={objectPosition}
      priority={priority}
      loading={loading}
      quality={quality}
      placeholder={blurDataURL}
      className={className ? className : ""}
    />
  );
};

export default ImageComponent;
