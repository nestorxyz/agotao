// h-[288px] w-[600px]
// Aspect ratio: 600 / 288 = 2.083

export const Preview: React.FC = () => {
  return (
    <div className="flex-1 overflow-hidden rounded-lg shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] md:rounded-xl">
      <div className="flex h-4 w-full items-center gap-1 bg-black px-2 md:h-6">
        <div className="h-2 w-2 rounded-full bg-[#f35162]"></div>
        <div className="h-2 w-2 rounded-full bg-[#f5d737]"></div>
        <div className="h-2 w-2 rounded-full bg-[#15bc59]"></div>
      </div>
      <div className="relative aspect-[2.083] w-full">
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
    </div>
  );
};
