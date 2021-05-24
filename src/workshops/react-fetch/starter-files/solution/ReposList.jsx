import React from "react";

function ReposList({ url }) {
  const [repos, setRepos] = React.useState();

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setRepos(data));
  }, [url]);

  if (!repos) return <div>Loading repos...</div>;
  return (
    <ul>
      {repos.map((repo) => (
        <li key={repo.id}>
          <a href={repo.url}>{repo.name}</a> | ⭐️ {repo.stargazers_count}
        </li>
      ))}
    </ul>
  );
}

export default ReposList;
