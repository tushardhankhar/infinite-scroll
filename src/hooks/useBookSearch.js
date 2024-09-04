import axios from "axios";
import { useState, useEffect } from "react";

export default function useBookSearch(query, page) {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  async function getBooks(params) {
    try {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: "https://openlibrary.org/search.json",
        params: {
          q: query,
          page: page,
        },
      });
      setBooks((prevBooks) => [...prevBooks, ...res?.data?.docs]);
      setHasMore(res?.data?.docs && true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      getBooks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query, page]);
  return {
    books,
    isLoading,
    hasMore,
  };
}
