import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/LogIn/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        toast.success("북마크에서 제거되었습니다.");
      } else {
        bookmarks.push(movieId);
        toast.success("북마크에 추가되었습니다.");
      }

      await setDoc(userDocRef, { movies: bookmarks }, { merge: true });
      setBookmarkedMovies(bookmarks);
    } catch (error) {
      console.error("Error toggling bookmark: ", error);
      toast.error("북마크 변경에 실패했습니다.");
    }
  };

  const removeBookmark = async (movieId) => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const userDocRef = doc(db, "bookmarks", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      let bookmarks = userDoc.exists() ? userDoc.data().movies : [];

      bookmarks = bookmarks.filter((id) => id !== movieId);

      await setDoc(userDocRef, { movies: bookmarks }, { merge: true });
      setBookmarkedMovies(bookmarks);
      toast.success("북마크에서 제거되었습니다.");
    } catch (error) {
      console.error("Error removing bookmark: ", error);
      toast.error("북마크 제거에 실패했습니다.");
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedMovies, toggleBookmark, removeBookmark }}
    >
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        closeButton={false}
        pauseOnHover
        draggable
      />
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
