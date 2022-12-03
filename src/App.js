import React, { useEffect, useState } from 'react';
import Card from './components/card';
import './App.css';

const arrayEmojis = ['🐢', '🐍', '🐱', '🐭', '🍑', '🍆'];

function App() {

  const [memo, setMemo] = useState([]);
  const [SelectedMemoBlock, setSelestedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const positionArrayEmoji = setPosition([...arrayEmojis, ...arrayEmojis]);

    setMemo(positionArrayEmoji.map((emoji, i) => ({ index: i, emoji: emoji, flipped: false })));
  }, []);

  const setPosition = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  const handleClick = (memoBlock) => {
    if (!animating) {
      const flippedMemo = { ...memoBlock, flipped: true };
      let memoCopy = [...memo];
      memoCopy.splice(memoBlock.index, 1, flippedMemo);
      setMemo(memoCopy);

      if (SelectedMemoBlock === null) {
        setSelestedMemoBlock(memoBlock);
      } else if (SelectedMemoBlock.emoji === memoBlock.emoji) {

        for (let i = 0; i < memoCopy.length; i++) {
          if (memoCopy[i].emoji === memoBlock.emoji) {
            memoCopy[i] = { ...memoCopy[i], flipped: true }
          }
        }
        setSelestedMemoBlock(null);
        setMemo(memoCopy);

      } else {
        setAnimating(true);
        setTimeout(() => {
          memoCopy[SelectedMemoBlock.index] = { ...SelectedMemoBlock, flipped: false };
          memoCopy[memoBlock.index] = { ...memoBlock, flipped: false };

          setMemo(memoCopy);
          setSelestedMemoBlock(null);
          setAnimating(false);

        }, 1000);
      }
    } else return;
  }

  return (
    <div className="App">
      <div className='containerCard-grid'>
        {memo.map((memoBlock, i) => <Card key={`${i}_${memoBlock.emoji}`} memoBlock={memoBlock} animating={animating} handleMemoClick={handleClick} />)}
      </div>
    </div>
  );
}

export default App;
