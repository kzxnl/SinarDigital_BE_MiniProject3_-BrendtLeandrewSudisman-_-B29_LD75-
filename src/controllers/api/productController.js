const prisma = require('../../utils/prismaClient');
exports.create = async (req, res) => {
const product = await prisma.product.create({
data: {
name: req.body.name,
price: req.body.price,
userId: req.user.id
}
});
res.json(product);
};
exports.getAll = async (req, res) => {
res.json(await prisma.product.findMany());
};
exports.getOne = async (req, res) => {
res.json(await prisma.product.findUnique({ where: { id: +req.params.id } }));
};
exports.update = async (req, res) => {
res.json(await prisma.product.update({
where: { id: +req.params.id },
data: req.body
}));
};
exports.remove = async (req, res) => {
await prisma.product.delete({ where: { id: +req.params.id } });
res.json({ message: 'Deleted' });
};
