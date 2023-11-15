type SvgIconProps = {
  id: string;
  width?: string | number;
  height?: string | number;
  fill?: string;
};

const Icon: React.FC<SvgIconProps> = ({
  id,
  width = '16',
  height = '16',
  fill = 'currentColor',
}) => {
  return (
    <svg width={width} height={height} fill={fill}>
      <use href={`#${id}`} />
    </svg>
  );
};

export default Icon;
