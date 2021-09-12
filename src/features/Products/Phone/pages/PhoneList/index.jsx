import React from "react";
import PropTypes from "prop-types";
import PhoneCard from "../../components/PhoneCard/index";
import "./styles.css";
import { useHistory } from "react-router";
import Loading from "components/Loading/index";

PhoneList.propTypes = {
  phones: PropTypes.array,
};

function PhoneList({ phones = [] }) {
  const history = useHistory();

  const handleOnClick = (phone) => {
    if (!phone.id) return;
    history.push(`products/${phone.id}`);
  };

  return Boolean(phones.length > 0) ? (
    <ul className="phone__list">
      {phones.map((phone) => (
        <PhoneCard key={phone.id} phone={phone} onClick={handleOnClick} />
      ))}
    </ul>
  ) : (
    <Loading />
  );
}

export default PhoneList;
