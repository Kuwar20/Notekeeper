// utils/user.js
export const getUserId = () => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
        userId = crypto.randomUUID(); // Generate a new UUID
        localStorage.setItem("userId", userId);
    }
    return userId;
};
