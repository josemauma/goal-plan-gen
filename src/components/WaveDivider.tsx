interface WaveDividerProps {
  className?: string;
  color?: string;
  flip?: boolean;
}

const WaveDivider = ({ className = "", color = "currentColor", flip = false }: WaveDividerProps) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`w-full h-16 md:h-20 lg:h-24 ${flip ? 'rotate-180' : ''} transition-all duration-500`}
        style={{ marginBottom: '-1px' }}
      >
        <path
          d="M0,120 C150,60 350,0 600,0 C850,0 1050,60 1200,120 L1200,120 L0,120 Z"
          fill={color}
          fillOpacity="0.8"
        />
        <path
          d="M0,120 C200,80 400,20 600,20 C800,20 1000,80 1200,120 L1200,120 L0,120 Z"
          fill={color}
          fillOpacity="0.4"
        />
        <path
          d="M0,120 C300,100 500,40 600,40 C700,40 900,100 1200,120 L1200,120 L0,120 Z"
          fill={color}
          fillOpacity="0.2"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;