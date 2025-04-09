document.addEventListener('DOMContentLoaded', () => {
    loadItems();

    document.getElementById('inventoryForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const itemName = document.getElementById('itemName').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;

        const response = await fetch('php/add_item.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemName, quantity, price })
        });

        if (response.ok) {
            loadItems();
            document.getElementById('inventoryForm').reset();
        }
    });
});

async function loadItems() {
    const response = await fetch('php/get_items.php');
    const items = await response.json();
    const tbody = document.getElementById('inventoryBody');
    tbody.innerHTML = '';

    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${parseFloat(item.price).toFixed(2)}</td>
            <td><button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
}

async function deleteItem(id) {
    const response = await fetch('php/delete_item.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
    });

    if (response.ok) {
        loadItems();
    }
}