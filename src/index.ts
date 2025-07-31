import App from "./core/index"

const port = Number(process.env.PORT) || 5001; 

const app = new App(port)

app.start()







