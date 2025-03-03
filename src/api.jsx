
const extractRepoDetails = (url) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    return match ? { owner: match[1], repo: match[2] } : null;
  };
  
 
  const fetchRepoContents = async (owner, repo, path = "") => {
    try {
        const url = ` https://api.github.com/repos/${owner}/${repo}/contents/${path}`
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch repository data");
  
      const data = await response.json();
      return data.map((item) => ({
        name: item.name,
        path: item.path,
        type: item.type,
        children: item.type === "dir" ? [] : null,
      }));
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
 
  const buildTree = async (owner, repo, path = "") => {
    const items = await fetchRepoContents(owner, repo, path);
  
    for (const item of items) {
      if (item.type === "dir") {
        item.children = await buildTree(owner, repo, item.path);
      }
    }
    return items;
  };
  
 
  export const fetchRepo = async (repoUrl) => {
    const repoDetails = extractRepoDetails(repoUrl);
    if (!repoDetails) {
      throw new Error("Invalid GitHub repository URL");
    }
  
    const { owner, repo } = repoDetails;
    return await buildTree(owner, repo);
  };