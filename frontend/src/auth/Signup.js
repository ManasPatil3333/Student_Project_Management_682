import { useState } from "react";
import api from "../api/axios";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", form);
      setMsg("Signup successful. Please login.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <p>{msg}</p>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
