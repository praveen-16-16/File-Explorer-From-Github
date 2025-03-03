import React, { useState } from "react";

export const DisplayTree = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li >
      {node.type === "dir" ? (
        <div onClick={() => setExpanded(!expanded)} >
          {expanded ? "📂" : "📁"} {node.name}
        </div>
      ) : (
        <div>📄 {node.name}</div>
      )}

      {expanded && (
        <ul>
          {node.children.map((child) => (
            <DisplayTree key={child.path} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};


