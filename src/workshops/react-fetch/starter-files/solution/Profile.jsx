import React from "react";
import ReposList from "./ReposList.jsx";

const USER_URL = "https://api.github.com/users/";

function Profile({ name }) {
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    fetch(USER_URL + name)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [name]);

  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <h1>{user.name}</h1>
      <img src={user.avatar_url} alt="" width="128" height="128" />
      <h2>Repos</h2>
      <ReposList url={user.repos_url} />
    </div>
  );
}

export default Profile;
