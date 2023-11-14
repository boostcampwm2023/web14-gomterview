type TabProps = {
  label?: string;
  value?: string;
  onClick?: (value?: string) => void;
};

const Tab: React.FC<TabProps> = ({ label, value, onClick }) => (
  <button onClick={() => onClick && onClick(value)}>{label}</button>
);

export default Tab;
