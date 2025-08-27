const express = require('express');
const app = express();
const PORT = 3000;

app.get('/data', (req, res) => {
    const user = {
        name: "Hemansi",
        role: "Developer"
    };

    res.jsonp(user); 
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
