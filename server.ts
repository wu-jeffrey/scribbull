import { app, Database } from "./app";

const PORT = process.env.PORT || 5000;

Database.connect();
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
