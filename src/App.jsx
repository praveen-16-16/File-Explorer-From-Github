import { useState } from "react";
import "./App.css";
import { DisplayTree } from "./DisplayTree";
import {fetchRepo} from "./api"

function App() {
  const [giturl, setgiturl] = useState("");
  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState(null);

  const HandleFetchRepo = async () => {
    setLoading(true);
    setTreeData(null);

    try {
      const tree = await fetchRepo(giturl);
      setTreeData(tree);
      console.log("Fetched Tree Data:", tree);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="title">GitHub Folder Viewer</h1>
      <input
        type="text"
        className="input"
        placeholder="Enter GitHub URL"
        onChange={(e) => setgiturl(e.target.value)}
        value={giturl}
      />
      <button className="btn" onClick={HandleFetchRepo}>Send</button>
      <br />
      {loading && <p>Loading...</p>}

      {treeData && (
        <ul>
          {treeData.map((item) => (
            <DisplayTree key={item.path} node={item} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
