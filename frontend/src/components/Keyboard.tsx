import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import ActionKey from "./ActionKey";
import CharKey from "./CharKey";

interface KeyboardProps {
  guessUpdater: (char: string) => void;
  deleteChar: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ guessUpdater, deleteChar }) => {
  const mapper = {
    row1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    row2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    row3: ["Z", "X", "C", "V", "B", "N", "M"],
  };

  return (
    <Box>
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
          {mapper.row1.map((char) => (
            <CharKey key={char} char={char} clickFn={guessUpdater} />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
          {mapper.row2.map((char) => (
            <CharKey key={char} char={char} clickFn={guessUpdater} />
          ))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
          {mapper.row3.map((char) => (
            <CharKey key={char} char={char} clickFn={guessUpdater} />
          ))}
          <ActionKey text="⌫" clickFn={deleteChar} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Keyboard;
