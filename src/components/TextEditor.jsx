import React, { useState } from 'react';

const TextEditor = ({ addText }) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');

  const handleAddText = () => {
    addText({ text, fontSize, fontFamily });
    setText('');
  };

  return (
    <div class="space-x-2">
      <input
        type="text"
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
      />
      <select
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
      >
        <option value="Arial">Arial</option>
        <option value="Verdana">Verdana</option>
        <option value="Times New Roman">Times New Roman</option>
        {/* Add more font options as needed */}
      </select>
      <button onClick={handleAddText} class="bg-slate-700 rounded-md px-2 hover:bg-slate-500 text-white">Add Text</button>
    </div>
  );
};

export default TextEditor;
