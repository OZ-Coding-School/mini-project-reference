// src/hooks/useBookmark.js
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../components/LogIn/AuthContext";

export default function useBookmark(movieId) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const checkIfBookmarked = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "bookmarks", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          const bookmarks = userDoc.exists() ? userDoc.data().movies : [];
          setIsBookmarked(bookmarks.includes(movieId));
        } catch (error) {
          console.error("Error checking bookmarks: ", error);
        }
      }
    };

    checkIfBookmarked();
  }, [currentUser, movieId]);

  const toggleBookmark = async () => {
    if (!currentUser) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const userDocRef = doc(db, "bookmarks", currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      let bookmarks = userDoc.exists() ? userDoc.data().movies : [];

      if (!bookmarks.includes(movieId)) {
        bookmarks.push(movieId);
        setIsBookmarked(true);
        alert("북마크에 추가되었습니다.");
      } else {
        bookmarks = bookmarks.filter((id) => id !== movieId);
        setIsBookmarked(false);
        alert("북마크에서 제거되었습니다.");
      }

      await setDoc(userDocRef, { movies: bookmarks }, { merge: true });

      // Return the updated bookmarks list
      return bookmarks;
    } catch (error) {
      console.error("Error toggling bookmark: ", error);
      alert("북마크 추가에 실패했습니다.");
    }
  };

  return [isBookmarked, toggleBookmark];
}
