import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import useBookSearch from "../../hooks/useBookSearch";
import { ThemeContext } from "../../context/themeContext";

export default function Books() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const observer = useRef(null);
  const { books, isLoading, hasMore } = useBookSearch(search, page);
  function handleChange(e) {
    setSearch(e.target.value);
  }
  const { theme } = useContext(ThemeContext);
  console.log(theme);
  useEffect(() => {
    if (search === "") {
      setPage(1);
    }
  }, []);

  const lastElement = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((enteries) => {
        if (enteries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  return (
    <div>
      <input
        placeholder="Search Books ..."
        onChange={handleChange}
        value={search}
      />
      <div>
        {isLoading && <span>Loading......</span>}
        {books.map((book, index) => {
          if (index + 1 === books.length) {
            return <div ref={lastElement}>{book.title}</div>;
          }
          return <div>{book.title}</div>;
        })}
      </div>
    </div>
  );
}
