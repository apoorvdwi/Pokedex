import React, { Component } from "react";
import axios from "axios";
import NavBar from "./Components/navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Cardlist from "./Components/CardList/CardList";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import SearchBox from "./Components/SearchBox/SearchBox";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Pokemon from "./Components/PokemonDetails/PokemonDetails";

class App extends Component {
  constructor() {
    super();

    this.state = {
      Pokemon: [],
      offset: 0,
      limit: 892,
      visible: 24,
      search: "",
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=" +
        String(this.state.offset) +
        "&limit=" +
        String(this.state.limit)
    );

    this.setState({ Pokemon: res.data["results"] });
  }

  render() {
    const Pokemons = this.state.Pokemon;
    const searchField = this.state.search;

    const filteredPokemons = Pokemons.filter((Pokemon) =>
      Pokemon.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <Router>
        <div className="App">
          <NavBar className="navbar" />
          <Switch>
            <Route exact path="/">
              <h1 className="title">POKEDEX</h1>
              <SearchBox
                placeholder="Search Pokemons"
                handleChange={(e) => this.setState({ search: e.target.value })}
              />
              {this.state.search === "" ? (
                <Cardlist
                  pokemons={this.state.Pokemon.slice(0, this.state.visible)}
                />
              ) : (
                <Cardlist pokemons={filteredPokemons} />
              )}
              <Fab
                variant="extended"
                onClick={() =>
                  this.setState({ visible: this.state.visible + 24 })
                }
              >
                <AddIcon />
                MORE
              </Fab>
              <Fab
                variant="extended"
                onClick={() =>
                  this.setState({ visible: this.state.visible - 24 })
                }
              >
                <RemoveIcon />
                LESS
              </Fab>
              <footer
                style={{
                  color: "#fff",
                  fontSize: "17px",
                  fontFamily: "Lato",
                  fontWeight: "300",
                }}
              >
                Created by Apoorv Dwivedi
              </footer>
            </Route>
            <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
