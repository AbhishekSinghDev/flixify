import React from "react";

interface BillboardProps {
  videoUrl: string;
  posterUrl?: string | "";
}

const Billboard: React.FC<BillboardProps> = ({ videoUrl, posterUrl }) => {
  return (
    <div>
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%] top-0 absolute"
        autoPlay
        muted
        loop
        poster={posterUrl}
        src={videoUrl}
      ></video>
    </div>
  );
};

export default Billboard;
