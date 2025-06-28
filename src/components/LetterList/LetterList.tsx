import LetterBlock from "../LetterBlock/LetterBlock";
import useButtonPress from "../../hooks/useButtonPress";
import "./letterList.css";

const LetterList = () => {
  const { word, borderColor } = useButtonPress();

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
