const paws = require("url:../../media/paws.png");
const burguer = require("url:../../media/burguer.png");
const vector = require("url:../../media/Vector.png");

export function initNavbarComp() {
  customElements.define(
    "nav-comp",
    class extends HTMLElement {
      shadow: ShadowRoot;

      constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
      }
      connectedCallback() {
        const style = document.createElement("style");
        style.innerHTML = `

        .header {
          margin: 0 auto;
        }
        
        .respmenu {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          background-color: #FF6868;
          position:relative;
          width:100%;
          padding:20px;
        }

        .respmenu .header__logo-burguer, .respmenu .header__logo-vector {
          font-size: 48px;
          pointer-events: none;
        }

        .respmenu .header__logo-vector{
          position: absolute;
          right: 20px;
        }

        .respmenu input[type="checkbox"], .respmenu .header-logo-burguer, .respmenu .header-logo-vector {
          position: absolute;
          margin: 0;
          padding: 0;
          right: 20px;
          top: 20px;
          width: 48px;
          height: 48px;
        }

        .respmenu input[type="checkbox"]{
          opacity:0;
        }

        .respmenu {
          color: white;
          position: relative;
          min-height: 48px;
        }
        
        .header__logo-burguer, .header__logo-paws, .header__logo-vector {
          height: 48px;
          width: 48px;
        }

        .respmenu nav {
          display: none;
        }
        
        .respmenu input:checked ~ nav {
          display: flex;
          flex-direction:column;
          height:100vh;
          font-size: 48px;
        }

        .respmenu input:checked ~ img {
          display: none;
        }



        .header__container input[type="checkbox"] {
          opacity: 0;
        }

        .respmenu a {
          color: inherit;
          text-decoration: none;
          display: block;
          padding: 10px 20px;
          max-width:auto;
        }

        `;

        this.shadow.appendChild(style);
        this.render();
      }
      render() {
        const div = document.createElement("div");

        div.innerHTML = `

        <header class="header"> 
          <div class="respmenu">
            <input type="checkbox" class="header__checkbox-input" />
            <img src="${paws}" class="header__logo-paws" />
            <img src="${burguer}" class="header__logo-burguer" />
            <nav>
              <img src="${vector}" class="header__logo-vector" />
              <ul>
                <li><a href="" class="title">mis datos</a></li>
                <li><a href="" class="title">mis mascotas reportadas</a></li>
                <li><a href="" class="title">reportar mascota</a></li>
              </ul>
            </nav>
            </div>
        </header>
        `;

        this.shadow.appendChild(div);
      }
    }
  );
}
