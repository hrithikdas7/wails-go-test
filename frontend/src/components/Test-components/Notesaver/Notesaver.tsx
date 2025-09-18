import { useState } from "react";
import { SaveNote } from "../../../../wailsjs/go/main/App";

export default function NoteSaver() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState("");

  async function onSave() {
  try {
    const res = await SaveNote(title, body);
    setResult(res);
  } catch (err: unknown) {
    const e = err as Error; // cast
    setResult("Error: " + e.message);
  }
}

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button onClick={onSave}>Save</button>
      <div>{result}</div>
    </div>
  );
}
