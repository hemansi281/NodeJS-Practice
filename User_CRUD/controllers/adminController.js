exports.adminController = (req, res) => {
    if (req.user.role != 'admin') {
        return res.status(401).json({ message: 'Access denied: Admins only' });
    }
    return res.status(200).json({ message: 'Welcome Admin!' });
}