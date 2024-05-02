import React, { useState, useEffect, useRef } from "react";
import SearchResults from "../SearchResults/SearchResults";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [search, setSearch] = React.useState("");
  const [showSearch, setShowSearch] = React.useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  function handleSetSearch(event) {
    setSearch(event.target.value);
  }

  function toggleSearchOn() {
    setShowSearch(true);
  }

  function toggleSearchOff() {
    setShowSearch(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/search/${encodeURIComponent(search)}`); // 검색 결과 페이지로 이동
    setShowSearch(false); // 검색 결과 모달 숨기기
  }

  // 외부 클릭을 감지하여 검색 결과를 숨김
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowSearch(false);
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef]);

  return (
    <div className="navbar-container" ref={searchContainerRef}>
      <div className="logo-container">
        <a href="/">로고</a>
      </div>
      <div className="action-bar">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="simple-search"
            className="search-input"
            placeholder="Search..."
            value={search}
            onChange={handleSetSearch}
            onMouseDown={toggleSearchOn}
          />
          <button type="submit" className="search-button">
            🔍
          </button>

          {showSearch && <SearchResults search={search} />}
        </form>
        <div className="auth-buttons">
          <button className="login-button">로그인</button>
          <button className="signup-button">회원가입</button>
        </div>
      </div>
    </div>
  );
}
