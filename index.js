const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = 3000;

// Items list
const items = [
	{ id: 1, name: 'Item 1' },
	{ id: 2, name: 'Item 2' },
	{ id: 3, name: 'Item 3' },
];

// GET all items
app.get('/items', (req, res) => {
	res.json(items);
})

// GET items by id
app.get('/items/:id', (req, res) => {
	const item = items.find(i => i.id == req.params.id);
	res.json(item);
})

// POST new item
app.post('/items', (req, res) => {
	const newItem = {
		id: items.length + 1,
		name: req.body.name
	};
	items.push(newItem);
	res.status(201).json({ message: 'Item created successfully', item: newItem });
})

// DELETE item by id
app.delete('/items/:id', (req, res) => {
	const itemId = parseInt(req.params.id);
	const index = items.findIndex((item) => item.id === itemId);

	if (index === -1) {
		return res.status(404).json({ error: 'Item not found' });
	}
	items.splice(index, 1);

	res.status(200).json({ message: "Item deleted successfully" });
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})