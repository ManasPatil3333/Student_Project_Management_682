import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2>Loading user...</h2>;
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <p>Role: {user.role}</p>

      <br />

      <Link to="/projects">
        <button>View Projects</button>
      </Link>
    </div>
  );
};

export default Dashboard;
