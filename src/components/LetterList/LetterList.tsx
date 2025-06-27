import { useEffect, useRef, useState } from "react";
import LetterBlock from "../LetterBlock/LetterBlock";
import useButtonPress from "../../hooks/useButtonPress";
import "./letterList.css";
import type { BorderColorType } from "../../types";

const LetterList = () => {
  const [word, setWord] = useState<string[]>([]);
  const [borderColor, setBorderColor] = useState<BorderColorType>("");
  const wordRef = useRef<string>("");

  useEffect(() => {
    wordRef.current = word.join("");
  }, [word]);

  const onLetter = (letter: string) => {
    if (word.length < 6) {
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

  useButtonPress({ onLetter, onBackspace, onEnter });

  return (
    <div
      className={`letters-container ${
        borderColor === "red"
          ? "red-border"
          : borderColor === "green"
          ? "green-border"
          : ""
      }`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        return <LetterBlock key={i} letter={word[i] ?? ""} />;
      })}
    </div>
  );
};

export default LetterList;
