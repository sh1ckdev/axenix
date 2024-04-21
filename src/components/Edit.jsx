import { useState } from 'react';

const SalesPointForm = () => {
    const [id, setId] = useState(1);
    const [name, setName] = useState('');
    const [coordinates, setCoordinates] = useState('');

    const handleEdit = async () => {
        const response = await fetch(`http://127.0.0.1:5000/salespoint/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, coordinates })
        });
        const data = await response.json();
        console.log(data);
    };

    const handleDelete = async () => {
        const response = await fetch(`http://127.0.0.1:5000/salespoint/edit/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} />
            <button onClick={handleEdit}>Редактировать</button>
            <button onClick={handleDelete}>Удалить</button>
        </div>
    );
};

export default SalesPointForm;
