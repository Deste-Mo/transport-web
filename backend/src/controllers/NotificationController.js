import pool from '../db/connexion.js';

// Nouvelle publication ainsi que les notifications pour ses abonnée
export const createNotification = async (req, res) => {
    try {
        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).json({ error: "Veuillez fournir userId et content pour créer une notification" });
        }

        const createNotificationQuery = `
            INSERT INTO Notification (userId, content)
            VALUES ($1, $2)
            RETURNING *
        `;

        const values = [userId, content];

        const newNotification = await pool.query(createNotificationQuery, values);

        return res.status(201).json(newNotification.rows[0]);

    } catch (error) {
        console.error("Erreur lors de la création de la notification :", error.message);
        return res.status(500).send("Erreur serveur : " + error.message);
    }
};

// Notifications pour un utilisateur spécifique
export const getNotificationsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const getNotificationsQuery = `
            SELECT *
            FROM Notification
            WHERE userId = $1
            ORDER BY notifDate DESC
        `;

        const notifications = await pool.query(getNotificationsQuery, [userId]);

        return res.status(200).json(notifications.rows);

    } catch (error) {
        console.error("Erreur lors de la récupération des notifications :", error.message);
        return res.status(500).send("Erreur serveur : " + error.message);
    }
};

// Marquer une notification comme vue
export const markNotificationAsViewed = async (req, res) => {
    try {
        const notifId = req.params.notifId;

        const markViewedQuery = `
            UPDATE Notification
            SET viewed = TRUE
            WHERE notifId = $1
            RETURNING *
        `;

        const updatedNotification = await pool.query(markViewedQuery, [notifId]);

        if (updatedNotification.rowCount === 0) {
            return res.status(404).json({ error: "Notification non trouvée" });
        }

        return res.status(200).json(updatedNotification.rows[0]);

    } catch (error) {
        console.error("Erreur lors du marquage de la notification comme vue :", error.message);
        return res.status(500).send("Erreur serveur : " + error.message);
    }
};

// Suppression
export const deleteNotification = async (req, res) => {
    try {
        const notifId = req.params.notifId;

        const deleteNotificationQuery = `
            DELETE FROM Notification
            WHERE notifId = $1
        `;

        const deletedNotification = await pool.query(deleteNotificationQuery, [notifId]);

        if (deletedNotification.rowCount === 0) {
            return res.status(404).json({ error: "Notification non trouvée" });
        }

        return res.status(204).send();

    } catch (error) {
        console.error("Erreur lors de la suppression de la notification :", error.message);
        return res.status(500).send("Erreur serveur : " + error.message);
    }
};

// Notifications paginées pour un utilisateur
export const getPaginatedNotificationsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { page = 1, pageSize = 10 } = req.query;
        const offset = (page - 1) * pageSize;

        const getNotificationsQuery = `
            SELECT *
            FROM Notification
            WHERE userId = $1
            ORDER BY notifDate DESC
            LIMIT $2 OFFSET $3
        `;

        const notifications = await pool.query(getNotificationsQuery, [userId, pageSize, offset]);

        return res.status(200).json({
            currentPage: page,
            pageSize: pageSize,
            totalPages: Math.ceil(notifications.rowCount / pageSize),
            notifications: notifications.rows
        });

    } catch (error) {
        console.error("Erreur lors de la récupération des notifications paginées :", error.message);
        return res.status(500).send("Erreur serveur : " + error.message);
    }
};

// Marquer toutes les notifications comme vues pour un utilisateur
export const markAllNotificationsAsViewed = async (req, res) => {
    try {
        const userId = req.params.userId;

        const markViewedQuery = `
            UPDATE Notification
            SET viewed = TRUE
            WHERE userId = $1
            RETURNING *
        `;

        const updatedNotifications = await pool.query(markViewedQuery, [userId]);

        return res.status(200).json(updatedNotifications.rows);

    } catch (error) {
        console.error("Erreur lors du marquage de toutes les notifications comme vues :", error.message);
        return res.status(500).send("Erreur serveur : " + error.message);
    }
};
