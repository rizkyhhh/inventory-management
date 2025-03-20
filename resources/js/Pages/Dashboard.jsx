import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ products }) {
    return (
        <div>
            <Head title="Dashboard" />
            <h1>Inventory Dashboard</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} - {product.stock}</li>
                ))}
            </ul>
        </div>
    );
}
