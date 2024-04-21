

export default function Fetch() {
    const handleGetRequest = async () => {
        const response = await fetch('http://127.0.0.1:5000/salespoints');
        const data = await response.json();
        console.log(data);
    };
    const handlePostRequest = async () => {
        const response = await fetch('http://127.0.0.1:5000/salespoints', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Название точки',
                coordinates: 'Координаты точки',
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <button onClick={handleGetRequest}>Получить точки продаж</button>
            <button onClick={handlePostRequest}>Создать новую точку продаж</button>
        </div>
    );
}
