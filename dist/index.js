import express from 'express';
import dataSource from './dataBase/dataSource.js';
const app = express();
app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`hello from PORT ${PORT}`);
    dataSource.initializeDB();
});
//# sourceMappingURL=index.js.map