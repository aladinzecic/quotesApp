import React, { useState } from "react";
import "./PostCard.css";
import axios from "axios";
export default function PostCard() {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const post = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/quotes",
        {
          content: content,
          author: author,
          tags: [tags],
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="login-card">
        <div></div>
        <h2>Post a new quote</h2>

        <form className="form">
          <input
            type="text"
            placeholder="Content"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            required
          ></input>
          <input
            type="text"
            placeholder="Author"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            required
          ></input>
          <input
            placeholder="Tags"
            onChange={(e) => {
              setTags(e.target.value);
            }}
            required
          ></input>
          <button onClick={post}>Post</button>
        </form>
      </div>
    </div>
  );
}
