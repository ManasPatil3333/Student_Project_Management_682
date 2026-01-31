import { useEffect, useState } from "react";
import axios from "../api/axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // fetch projects
  const loadProjects = async () => {
    const res = await axios.get("/projects", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data);
  };

  useEffect(() => {
  const loadProjects = async () => {
    const res = await axios.get("/projects", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data);
  };

  loadProjects();
}, [token]);


  // add project
  const addProject = async () => {
    if (!title) return;

    await axios.post(
      "/projects",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    loadProjects();
  };

  const deleteProject = async (id) => {
  console.log("Deleting id:", id);   // add this

  const token = localStorage.getItem("token");

  await axios.delete(`/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadProjects(); 
};


  return (
    <div>
      <h2>Projects</h2>

      <input
        placeholder="Project title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addProject}>Add</button>

      <ul>
        {projects.map(project => (
  <li key={project.id}>
    {project.title}
    <button onClick={() => deleteProject(project.id)}>
      Delete
    </button>
  </li>
))}

      </ul>
    </div>
  );
};

export default Projects;
