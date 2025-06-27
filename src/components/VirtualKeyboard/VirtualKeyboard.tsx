import { myEventListener } from "../../utils/eventClicksListener";
import "./VirtualKeyboard.css"; // or use Tailwind / inline styles

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
];

const VirtualKeyboard = () => {
  const handleClick = (key: string) => {
    myEventListener.emit("ButtonPress", key);
  };

  return (
    <div className="keyboard">
      {keys.map((row, i) => (
        <div key={i} className="keyboard-row">
          {row.map((key) => (
            <button
              key={key}
              className={`key key-${key.toLowerCase()}`}
              onClick={() => handleClick(key)}
            >
              {key === "Backspace" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
