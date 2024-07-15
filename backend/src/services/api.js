// backend/src/services/api.js

const fetchFriendInvitations = async () => {
    try {
        // Simulating a delay as if fetching from a real backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const invitations = [
            { userId: 1, firstName: 'John', lastName: 'Doe', accountType: 'Client' },
            { userId: 2, firstName: 'Jane', lastName: 'Smith', accountType: 'Camionneur' },
            { userId: 3, firstName: 'Emily', lastName: 'Brown', accountType: 'Entreprise' },
        ];
        return invitations;
    } catch (error) {
        throw new Error('Error fetching invitations');
    }
};

module.exports = {
    fetchFriendInvitations,
};
