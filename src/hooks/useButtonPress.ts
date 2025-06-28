import { useEffect, useRef, useState } from "react";
import { myEventListener } from "../utils/eventClicksListener";
import type { BorderColorType } from "../types";
import { EventTypes } from "../utils/eventTypes";

const useButtonPress = () => {
  const [word, setWord] = useState<string[]>([]);
  const [borderColor, setBorderColor] = useState<BorderColorType>("");
  const wordRef = useRef<string>("");

  useEffect(() => {
    wordRef.current = word.join("");
  }, [word]);

  const registeredRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      myEventListener.emit(EventTypes.ButtonPress, e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    if (registeredRef.current) return;
    const onButtonPress = (letter: string) => {
      if (/^[a-zA-Z]$/.test(letter)) {
        onLetter(letter);
      } else if (letter === "Backspace") {
        setBorderColor("");
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

  const onLetter = (letter: string) => {
    if (wordRef.current.length < 6) {
      setWord((prev) => {
        if (prev.length < 5) {
          return [...prev, letter];
        } else {
          return prev;
        }
      });
    }
  };

  const onBackspace = () => {
    setWord((prev) => prev.slice(0, -1));
  };

  const onEnter = async () => {
    if (wordRef.current.length === 5) {
      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${wordRef.current}`
        );
        if (!res.ok) {
          if (res.status === 404) {
            setBorderColor("red");
          }
        } else {
          setBorderColor("green");
        }
      } catch (err) {}
    } else {
      setBorderColor("red");
    }
  };

  return { word, borderColor };
};

export default useButtonPress;
