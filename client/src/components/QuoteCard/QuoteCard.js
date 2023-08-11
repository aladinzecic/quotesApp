import React, { useState, useContext } from "react";
import "./QuoteCard.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
export default function QuoteCard({
  id,
  content,
  author,
  downvotesCount,
  upvotesCount,
  givenVotee,
}) {
  const [upVotesCount, setUpVotesCount] = useState(upvotesCount);
  const [downVotesCount, setDownVotesCount] = useState(downvotesCount);
  const [givenVote, setGivenVote] = useState(givenVotee);
  const { accessToken, token } = useContext(AppContext);

  function vote(up, down) {
    let output = (up / (up + down)) * 100;
    let output2 = output.toFixed(0);
    if (!isFinite(output2)) {
      output2 = 100;
    }
    if (output2 >= 80) {
      return (
        <p id="votes" style={{ color: "green" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 60) {
      return (
        <p id="votes" style={{ color: "limegreen" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 40) {
      return (
        <p id="votes" style={{ color: "orange" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 20) {
      return (
        <p id="votes" style={{ color: "yellow" }}>
          {output2}%
        </p>
      );
    } else if (output2 >= 0) {
      return (
        <p id="votes" style={{ color: "red" }}>
          {output2}%
        </p>
      );
    }
  }
  const upvote=()=> {

    if(givenVote==="none"){
    console.log(localStorage.getItem("token"))
    axios.post(
      `http://localhost:8000/quotes/${id}/upvote`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      setGivenVote("upvote")
      // console.log(res.data)
      setUpVotesCount(upVotesCount+1)
    })
    .catch(err=>{
      console.log(err)
    })
  }
    else if(givenVote==="upvote"){
    axios.delete(
      `http://localhost:8000/quotes/${id}/upvote`,
      
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      setGivenVote("none")
      // console.log(res.data)
      setUpVotesCount(upVotesCount-1)
    })
    .catch(err=>{
      console.log(err)
    })
  }
    else if(givenVote==="downvote"){
    axios.delete(
      `http://localhost:8000/quotes/${id}/downvote`,
      
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      // console.log(res.data)
      setDownVotesCount(downVotesCount-1)
    })
    .catch(err=>{
      console.log(err)
    })

    axios.post(
      `http://localhost:8000/quotes/${id}/upvote`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      setGivenVote("upvote")
      // console.log(res.data)
      setUpVotesCount(upVotesCount+1)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  }



  const downvote=()=> {

    if(givenVote==="none"){
    console.log(localStorage.getItem("token"))
    axios.post(
      `http://localhost:8000/quotes/${id}/downvote`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      setGivenVote("downvote")
      console.log(res.data)
      setDownVotesCount(downVotesCount+1)
    })
    .catch(err=>{
      console.log(err)
    })
  }
    else if(givenVote==="downvote"){
    axios.delete(
      `http://localhost:8000/quotes/${id}/downvote`,
      
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      setGivenVote("none")
      // console.log(res.data)
      setDownVotesCount(downVotesCount-1)

    })
    .catch(err=>{
      console.log(err)
    })
  }
    else if(givenVote==="upvote"){
    axios.delete(
      `http://localhost:8000/quotes/${id}/upvote`,
      
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      // console.log(res.data)
      setUpVotesCount(upVotesCount-1)
    })
    .catch(err=>{
      console.log(err)
    })

    axios.post(
      `http://localhost:8000/quotes/${id}/downvote`,
      {},
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    .then(res=>{
      setGivenVote("downvote")
      // console.log(res.data)
      setDownVotesCount(downVotesCount+1)

    })
    .catch(err=>{
      console.log(err)
    })
  }
  }

  return (
    <div className="quote-div">
      <div className="left">
        <ArrowDropUpIcon className={givenVote==="upvote"?"active":"passive"} onClick={() => upvote()} />
        <h2>{vote(upVotesCount, downVotesCount)}</h2>
        <h5>
          {upVotesCount}/{downVotesCount}
        </h5>
        <ArrowDropDownIcon className={givenVote==="downvote"?"active":"passive"} onClick={() => downvote()}/>
      </div>
      <div className="right">
        
        <h3>{content}</h3>
        <h4>{author}</h4>
      </div>
    </div>
  );
}
