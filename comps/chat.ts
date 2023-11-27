import { state } from "../src/state";
type Message = {
    from: string,
    message: string
}

customElements.define("chatr-el",
    class ChatRoom extends HTMLElement {
        connectedCallback() {
            state.subscribe(() => {
                const currentState = state.getState();
                this.messages = currentState.messages;
                this.render();
            })
            this.render()
        }
        messages: Message[] = []
        addlisteners() {
            const form = this.querySelector(".form");
            form?.addEventListener("submit", function (e) {
                e.preventDefault()
                const target = e.target as any;
                const formInput = target?.input.value;
                state.pushMessage(formInput);
            });
        }
        render() {

            const style = document.createElement("style")
            style.textContent = `                
             .root {
             width: 375px;
             font-family: 'Roboto', sans-serif;
             min-height: 667px;
             display: flex;
             flex-direction: column;
             align-items: center;
            }            
            .absoulte{
                position: absolute            
            }            
            .header {
                width: 375px;
                height: 60px;
                background-color: palegreen;
            }
            .title {
                font-family: 'Roboto', sans-serif;
                text-align: center;
                font-size: 80;
            }
            .feed{
                display: flex;
                flex-direction: column;
                height: 393px;
                width: 375px;
                background-color:green;
            }
            .form {
                display: flex;
                flex-direction: column;
                gap: 7px;
                background-color: aquamarine;
                padding: 10px 5px;
                position:bottom;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .label {
                font-size: 25;
            }
            .input {
                width: 312px;
                height: 55px;
                border-radius: 5px;
                font-size: 20px;
                border: solid black 3px;
            }
            .button {
                width: 312px;
                height: 55px;
                border-radius: 5px;
                font-size: 20px;
                border: solid black 3px;
            }
            .button:active {
                background-color: aqua;
            }
            `;
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="absolute">
                <header class="header"></header>
                <h2 class="title">Chat</h2>        
                </div>
                <div class="feed">${this.messages.map((m) => {
                return `<div class="message">${m.from}:${m.message}</div>`;
            })}
                </div>
                <form class="form">                  
                    <input class="input" type="text" name="input">
                    <button class="button" type="submit" id="textid">Comenzar</button>
                </form>
                `;
            div.classList.add("root")
            this.appendChild(style);
            this.appendChild(div);
            this.addlisteners();
        }
    }
)
