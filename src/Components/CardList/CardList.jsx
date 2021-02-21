import React from "react";
import "./CardList.css";
import Card from "../Card/Card";

const CardList = (props) => {
  return (
    <div className="cardList">
      {props.pokemons.map((pokemon, index) => (
        <Card key={index} id={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default CardList;
