import { useEffect, useRef } from "react";
import { myEventListener } from "../utils/eventClicksListener";

type ButtonHandlers = {
  onLetter: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
};

const useButtonPress = ({ onLetter, onBackspace, onEnter }: ButtonHandlers) => {
  const registeredRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      myEventListener.emit("ButtonPress", e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    if (registeredRef.current) return;
    const onButtonPress = (letter: string) => {
      if (/^[a-zA-Z]$/.test(letter)) {
        onLetter(letter);
      } else if (letter === "Backspace") {
        onBackspace();
      } else if (letter === "Enter") {
        onEnter();
      }
    };
    myEventListener.registerListener("ButtonPress", onButtonPress);
    registeredRef.current = true;

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default useButtonPress;
