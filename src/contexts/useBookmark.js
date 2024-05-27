import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/LogIn/AuthContext";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const { currentUser } = useAuth();
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  useEffect(() => {
    const fetchBookmarkedMovies = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "bookmarks", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const movieIds = userDoc.exists() ? userDoc.data().movies : [];
        setBookmarkedMovies(movieIds);
      }
    };

    fetchBookmarkedMovies();
  }, [currentUser]);

  const toggleBookmark = async (movieId) => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const userDocRef = doc(db, "bookmarks", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      let bookmarks = userDoc.exists() ? userDoc.data().movies : [];

      if (bookmarks.includes(movieId)) {
        bookmarks = bookmarks.filter((id) => id !== movieId);
      } else {
        bookmarks.push(movieId);
      }

      await setDoc(userDocRef, { movies: bookmarks }, { merge: true });
      setBookmarkedMovies(bookmarks);
    } catch (error) {
      console.error("Error toggling bookmark: ", error);
      alert("북마크 추가에 실패했습니다.");
    }
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedMovies, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
