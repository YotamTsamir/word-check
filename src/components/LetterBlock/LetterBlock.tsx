import "./letterBlock.css";

const LetterBlock = ({ letter }: { letter: string }) => {
  return (
    <div className="letter-container">
      <span className="letter">{letter}</span>
    </div>
  );
};

export default LetterBlock;
