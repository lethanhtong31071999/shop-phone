import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "../../../../../../../node_modules/@fortawesome/react-fontawesome/index";
import {
  faSearch,
  faTimes,
} from "../../../../../../../node_modules/@fortawesome/free-solid-svg-icons/index";
import productApi from "api/productApi";
import { useHistory } from "react-router";
import Loading from "components/Loading/index";

SearchTermNav.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
};

const initialSuggestions = ["Iphone", "Xiao mi", "Oppo"];

function SearchTermNav(props) {
  const { onSearch = null, openModal = null } = props;
  const history = useHistory();

  const [searchValue, setSearchValue] = useState("");
  const [isShowSuggestion, setIsShowSuggestion] = useState(false);
  const [sugesstions, setSuggestions] = useState(initialSuggestions);

  useEffect(() => {
    try {
      (async () => {
        if (searchValue === "") {
          setSuggestions(initialSuggestions);
          return;
        }
        const params = { name_like: searchValue, _limit: 20, _page: 1 };
        const res = await productApi.getAll(params);
        const nameProducts = res.data.map((p) => p.name || "");
        const valueSugesstions = nameProducts.filter(
          (name, i) => nameProducts.indexOf(name) === i
        );
        setSuggestions(valueSugesstions);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [searchValue]);

  const handleOnSubmit = (e) => {
    e?.preventDefault();
    if (!onSearch) return;

    onSearch(searchValue);
    openModal(false);
    setIsShowSuggestion(false);
    history.push("/phones");
  };

  const onInputFiledChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleInputFiledClick = (e, modalValue, fieldValue = "") => {
    e.stopPropagation();
    const newState = modalValue;
    openModal(newState);
    setIsShowSuggestion(true);

    if (fieldValue.trim() === "") return;
    if (fieldValue.trim() === "close") {
      setIsShowSuggestion(false);
      return;
    }
    setSearchValue(fieldValue);
    onSearch(fieldValue);
    setIsShowSuggestion(false);
    history.push("/phones");
  };

  return (
    <form className="header__top-search" onSubmit={handleOnSubmit}>
      <input
        type="text"
        name="main-search"
        placeholder="Bạn tìm gì..."
        value={searchValue}
        onChange={onInputFiledChange}
        onClick={(e) => handleInputFiledClick(e, true)}
      />
      <button
        type="submit"
        style={{
          border: "none",
          outline: "none",
          background: "white",
          cursor: "pointer",
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <div
        className={
          isShowSuggestion
            ? "header__top-search-suggestion active"
            : "header__top-search-suggestion"
        }
      >
        <div className="header__top-search-suggestion-header">
          <p>Kết quả tìm kiếm: </p>
          <i onClick={(e) => handleInputFiledClick(e, false, "close")}>
            <FontAwesomeIcon icon={faTimes} />
          </i>
        </div>
        <ul>
          {sugesstions.map((item) => (
            <li onClick={(e) => handleInputFiledClick(e, false, item)}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default SearchTermNav;
