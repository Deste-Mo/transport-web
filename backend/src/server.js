const express = require('express');
const friendsRouter = require('./routes/friendsRouter');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/friends', friendsRouter); // Utilisation des routes définies dans friendsRouter

app.listen(PORT, () => {
    console.log(`Serveur backend en cours d'exécution sur le port ${PORT}`);
});
