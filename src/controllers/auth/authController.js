const bcrypt = require('bcryptjs');
const prisma = require('../../utils/prismaClient');
const { signToken } = require('../../utils/jwt');
exports.register = async (req, res) => {
const { email, password } = req.body;
const hashed = await bcrypt.hash(password, 10);
const user = await prisma.user.create({
data: { email, password: hashed }
});
res.json(user);
};
exports.login = async (req, res) => {
const { email, password } = req.body;
const user = await prisma.user.findUnique({ where: { email } });
if (!user) return res.status(400).json({ message: 'User not found' });
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Wrong password' });
const token = signToken({ id: user.id });
res.json({ token });
};
