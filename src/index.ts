import app from "./app";
import { config } from "dotenv";

config();

const PORT = process.env.NODE_PORT || 9000;

app.listen(PORT, () => console.log(`App in http://localhost:${PORT}`));
