import Key from "./Key";
import { KeyboardCharState } from "./Keyboard";

interface CharKeyProps {
  char: string;
  state: KeyboardCharState;
  clickFn: (char: string) => void;
}

const CharKey: React.FC<CharKeyProps> = ({ char, state, clickFn }) => {
  const onClick = () => {
    return clickFn(char);
  };

  return <Key text={char} state={state} onClick={onClick} />;
};

export default CharKey;
