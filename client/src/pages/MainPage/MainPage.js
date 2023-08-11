import React, { useState, useContext, useEffect } from "react";
import QuoteCard from "../../components/QuoteCard/QuoteCard";
import "./MainPage.css";
import Header from "../../components/Header/Header";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

export default function MainPage() {
  const { quotes, setQuotes, accessToken } = useContext(AppContext);
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    setPage(value);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const quotesPerPage = 4;
  const [numPages, setNumPages] = useState(
    Math.ceil(quotes.length / quotesPerPage)
  );

  const [selectedQuotes, setSelectedQuotes] = useState([]);

  const handleTag = (e) => {
    const tag = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedQuotes([...selectedQuotes, tag]);
      setPage(1);
    } else {
      setSelectedQuotes(
        selectedQuotes.filter((selectedTag) => selectedTag !== tag)
      );
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/quotes", {
        headers: { Authorization: "Bearer " + accessToken },
      })
      .then((res) => {
        setQuotes(res.data.quotes);
        console.log(res.data.quotes);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredQuotes = quotes.filter((quote) => {
    if (selectedQuotes.length === 0) {
      return true;
    }
    return quote.tags.some((tag) => selectedQuotes.includes(tag));
  });

  return (
    <>
      <div className="main-div">
        <div className="green"></div>
        <div className="gray"></div>
        <div>
          {" "}
          <svg
            className="svg1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#20df7f"
              fillOpacity="1"
              d="M0,224L80,213.3C160,203,320,181,480,186.7C640,192,800,224,960,240C1120,256,1280,256,1360,256L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
        <svg
          className="svg2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#28595e"
            fillOpacity="1"
            d="M0,224L60,234.7C120,245,240,267,360,277.3C480,288,600,288,720,261.3C840,235,960,181,1080,181.3C1200,181,1320,235,1380,261.3L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <Header />
        <div className="filterDiv">
          <input
            type="checkbox"
            value="humor"
            checked={selectedQuotes.includes("humor")}
            onChange={handleTag}
          />

          <input
            type="checkbox"
            value="life"
            checked={selectedQuotes.includes("life")}
            onChange={handleTag}
          />

          <input
            type="checkbox"
            value="books"
            checked={selectedQuotes.includes("books")}
            onChange={handleTag}
          />

          <input
            type="checkbox"
            value="action"
            checked={selectedQuotes.includes("action")}
            onChange={handleTag}
          />
        </div>
        <div className="filterDiv">
          <p>humour</p>
          <p>life</p>
          <p>books</p>
          <p>action</p>
        </div>
        <div className="quotess">
          {filteredQuotes
            .map((quote) => {
              return (
                <div key={quote.id}>
                  <QuoteCard
                    id={quote.id}
                    content={quote.content}
                    author={quote.author}
                    downvotesCount={quote.downvotesCount}
                    upvotesCount={quote.upvotesCount}
                    givenVotee={quote.givenVote}
                  />
                </div>
              );
            })
            .slice((page - 1) * quotesPerPage, page * quotesPerPage)}
        </div>
        <div className="pagination">
          {numPages > 1 && (
            <Pagination
            
              className="pagination"
              size="large"
              count={numPages}
              page={page}
              onChange={handleChange}
              color="secondary"
            />
          )}
        </div>
      </div>
    </>
  );
}
