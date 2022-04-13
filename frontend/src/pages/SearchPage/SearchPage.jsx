import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

const SearchPage = (props) => {
    const navigate = useNavigate();
  const {state} = useLocation();
  const [searchResult, setSearchResult] = useState([]);

  async function search() {
  
      const search = await axios.get(
        ``
      );
      setSearchResult(search.data.items);
      console.log(searchResult);

  }

  useEffect(() => {
    search();
  }, [state.searchTerm]);

  return (
      logic (here)
  );
  };
export default SearchPage;
