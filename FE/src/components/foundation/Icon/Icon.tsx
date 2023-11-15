import { HTMLElementTypes } from '@/types/utils';

type SvgIconProps = {
  id: string;
  width?: string;
  height?: string;
} & HTMLElementTypes<SVGElement> &
  React.SVGProps<SVGSVGElement>;

const Icon: React.FC<SvgIconProps> = ({
  id,
  width = '16',
  height = '16',
  ...props
}) => {
  return (
    <svg width={width} height={height} {...props}>
      <use href={`#${id}`} />
    </svg>
  );
};

export default Icon;
