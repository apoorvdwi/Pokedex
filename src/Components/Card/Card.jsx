import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import errorList from "../../errorlist";
import "./Card.css";

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  dark: "#83756C",
  ghost: "#7F7FC1",
  ice: "#B5EBFD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  steel: "#C3C3CF",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const Card = (props) => {
  const [Data, setData] = useState({
    id: "",
    id_str: "",
    color: "",
    type: "Not Defined",
    imgURL: "",
  });

  const getPokemon = async (id) => {
    const main_types = Object.keys(colors);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    const poke_types = pokemon.types.map((type) => type.type.name);
    const type = main_types.find((type) => poke_types.indexOf(type) > -1);
    const color = colors[type];
    let imgURL = "";

    if (errorList.includes(Number(id))) {
      imgURL =
        "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" +
        String(id).padStart(3, "0") +
        ".png";
    } else {
      imgURL = "https://pokeres.bastionbot.org/images/pokemon/" + id + ".png";
    }

    setData((prevState) => {
      return { ...prevState, color: color, type: type, imgURL: imgURL };
    });
  };

  useEffect(() => {
    const id = props.pokemon.url.split("/")[6];
    let id_str = String(id).padStart(3, "0");

    setData({ id: id, id_str: id_str });
    getPokemon(id);
  }, [props.pokemon.name, props.pokemon.url]);

  return (
    <div className="cardContainer" style={{ backgroundColor: Data.color }}>
      <Link to={"pokemon/" + Data.id}>
        <div className="imgContainer">
          <img
            className="cardImage"
            alt={props.pokemon.name}
            src={Data.imgURL}
          />
        </div>
        <div className="info">
          <span className="number">{"#" + Data.id_str}</span>
          <h5 className="name">{props.pokemon.name}</h5>
          <small>
            Type: <span>{Data.type}</span>
          </small>
        </div>
      </Link>
    </div>
  );
};

export default Card;
