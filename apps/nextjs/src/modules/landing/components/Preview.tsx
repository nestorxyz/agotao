// h-[288px] w-[600px]
// Aspect ratio: 600 / 288 = 2.083
import Tilt from "react-parallax-tilt";

export const Preview: React.FC = () => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.3}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="8px"
      tiltMaxAngleX={3}
      tiltMaxAngleY={3}
      tiltReverse={true}
      className="flex-1"
    >
      <div className="relative aspect-[2.083] w-full overflow-hidden rounded-2xl">
        <video
          className="absolute top-0 left-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/preview.mp4" type="video/mp4" />
        </video>
      </div>
    </Tilt>
  );
};
