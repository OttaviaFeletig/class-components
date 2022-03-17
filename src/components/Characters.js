import React, { Component } from "react";

export class Characters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "https://rickandmortyapi.com/api/character/",
      characters: [],
      error: null,
      next: null,
      prev: null,
    };
    this.updateUrl = this.updateUrl.bind(this);
  }

  async fetchData() {
    try {
      const response = await fetch(this.state.url);
      const data = await response.json();
      console.log("data", data);
      this.setState({
        characters: data.results,
        prev: data.info.prev,
        next: data.info.next,
      });
    } catch (error) {
      this.setState({ error: "An error occurred" });
    }
  }
  updateUrl(event) {
    console.log(event.target.value);
    event.target.value === "prev"
      ? this.setState({ url: this.state.prev })
      : this.setState({ url: this.state.next });
  }
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.url !== this.state.url) {
      this.fetchData();
    }
  }
  render() {
    return (
      <div>
        <button value={"prev"} onClick={this.updateUrl}>
          prev
        </button>
        <button value={"next"} onClick={this.updateUrl}>
          next
        </button>
        {this.state.characters.map((character) => {
          return (
            <div>
              <img src={character.image} alt="" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Characters;
