import React, { Component } from "react";

import "./styles/character.css";
import logo from "../images/rickandmorty-logo.png";

import * as Loaderbutton from "./Loader";

function Character(props) {
  const { character } = props;
  return (
    <div
      className="CharacterCard "
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div
        className="CharacterCard__name-container"
        style={{ fontFamily: "Helvetica" }}
      >
        {character.name}
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPage: 1,
      data: {
        results: [],
      },
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
      );
      const data = await response.json();
      setTimeout(() => {
        this.setState({
          loading: false,
          data: {
            info: data.info,
            results: [].concat(this.state.data.results, data.results),
          },
          nextPage: this.state.nextPage + 1,
        });
      }, 1000);
    } catch (error) {
      this.setState({
        loading: false,
        error: error,
      });
    }
  };
  render() {
    if (this.state.error) {
      console.log(`Error: ${this.state.error.message}`);
    }
    return (
      <div className="container text-dark">
        <div className="row">
          <div className="Logo__container col-12">
            <img className="Logo" src={logo} alt="Rick y Morty" />
          </div>

          <div className="App">
            <ul className="row">
              {this.state.data.results.map((character) => {
                return (
                  <li
                    className="col-12 col-md-3 list-unstyled"
                    key={character.id}
                  >
                    <Character character={character} />
                  </li>
                );
              })}
            </ul>
            {/* <div className="loader">
              {this.state.loading && (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              )}
            </div> */}
            {this.state.loading && <Loaderbutton.Loader />}
            {!this.state.loading && (
              <button
                onClick={() => this.fetchCharacters()}
                className="btn btn-primary"
                style={{
                  width: "100%",
                  marginBottom: "5vh",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
