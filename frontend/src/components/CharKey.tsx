import Key from "./Key";

interface CharKeyProps {
  char: string;
  clickFn: (char: string) => void;
}

const CharKey: React.FC<CharKeyProps> = ({ char, clickFn }) => {
  const onClick = () => {
    return clickFn(char);
  };

  return <Key text={char} onClick={onClick} />;
};

export default CharKey;
