import Key from "./Key";

interface ActionKeyProps {
  text: string;
  clickFn: (text: string) => void;
}

const ActionKey: React.FC<ActionKeyProps> = ({ text, clickFn }) => {
  const onClick = () => {
    return clickFn(text);
  };

  return <Key text={text} onClick={onClick} size="large" />;
};

export default ActionKey;
