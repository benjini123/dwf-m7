import { Router } from "@vaadin/router";

customElements.define(
  "home-page",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
      this.addListeners();
    }
    addListeners() {
      const buttonEl = this.querySelector(".main__boton-ubicacion");
      const containerEl = this.querySelector(".main__dogs-container");
      const locatorEl = this.querySelector(".main__locator") as any;

      buttonEl.addEventListener("click", (e) => {
        e.preventDefault;
        locatorEl.style.display = "none";

        window.navigator.geolocation.getCurrentPosition((position) => {
          fetch(
            "/comercios-cerca-de?lat=" +
              position.coords.latitude +
              "&lng=" +
              position.coords.longitude
          )
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
    }
    render() {
      this.innerHTML = `

      <nav-comp></nav-comp>
      <main class="main">
        <h1>Mascotas perdidas cerca tuyo</h1>
        <div class="main__locator">
          <h3>Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.</h3>
          <button class="main__boton-ubicacion">Dar mi ubicacion</button>
        </div>
        <div class="main__dogs-container">
          <template>
            <img src="../../media/doggo.png"/>
            <h2></h2>
            <h3></h3>
            <a></a>
          </template>
        </div>
      </main> 
      `;
      this.className = "results__container";
    }
  }
);
