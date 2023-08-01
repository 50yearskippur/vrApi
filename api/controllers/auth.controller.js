exports.auth = async (req, res) => {
    const { username, password } = req.body;
    const adminUsers = JSON.parse(process.env.ADMIN_USERS);

    // Use .find() to find the matching admin user
    const matchingUser = adminUsers.find((user) => user.username === username && user.password === password);

    if (matchingUser) {
        return res.status(201).json({ found: true });
    } else {
        // No matching admin user
        return res.status(201).json({ found: false });
    }
};