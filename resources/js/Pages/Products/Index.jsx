import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, Link } from "@inertiajs/react";

export default function Index({ products }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            destroy(`/products/${id}`); 
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 bg-white shadow rounded-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Products</h1>
                <Link href="/products/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Product
                </Link>

                <div className="overflow-x-auto mt-4">
                    <table className="w-full border-collapse border border-gray-200 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Initial Stock</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Category</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Current Location</th>
                                <th className="border p-2">Transfer History</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                const initialStock = product.stock ?? 0; // Default stock to 0 if null
                                const updatedLocations = product.locations.map(location => ({
                                    ...location,
                                    currentStock: Number(location.pivot?.quantity) || 0
                                }));

                                return (
                                    <tr key={product.id} className="border">
                                        <td className="border p-2">{product.name}</td>
                                        <td className="border p-2">{initialStock} pcs</td>
                                        <td className="border p-2">${product.price}</td>
                                        <td className="border p-2">{product.category ? product.category.name : "No Category"}</td>
                                        <td className="border p-2">{product.status ? product.status.status : "No Status"}</td>
                                        <td className="border p-2">
                                            {product.image ? (
                                                <img src={`/storage/${product.image}`} alt={product.name} width="50" className="rounded" />
                                            ) : (
                                                <span>No image</span>
                                            )}
                                        </td>

                                        {/* Current Location (Latest Source Location First) */}
                                        <td className="border p-2">
                                            {updatedLocations.length > 0 ? (
                                                [...updatedLocations]
                                                    .sort((a, b) => {
                                                        // Get the latest transfer where this location was the source
                                                        const latestTransferA = product.transfers
                                                            .filter(t => t.source_location_id === a.id)
                                                            .sort((x, y) => new Date(y.created_at) - new Date(x.created_at))[0];

                                                        const latestTransferB = product.transfers
                                                            .filter(t => t.source_location_id === b.id)
                                                            .sort((x, y) => new Date(y.created_at) - new Date(x.created_at))[0];

                                                        // If both locations were sources in a transfer, sort by the most recent one
                                                        if (latestTransferA && latestTransferB) {
                                                            return new Date(latestTransferB.created_at) - new Date(latestTransferA.created_at);
                                                        }

                                                        // If only one of them was a source, put that one first
                                                        if (latestTransferA) return -1;
                                                        if (latestTransferB) return 1;

                                                        return 0; // If neither were sources, keep the order
                                                    })
                                                    .map(location => (
                                                        <div key={location.id}>
                                                            {location.name} - {Math.max(0, location.currentStock)} pcs
                                                        </div>
                                                    ))
                                            ) : (
                                                <span>No location assigned</span>
                                            )}
                                        </td>

                                        {/* Transfer History */}
                                        <td className="border p-2">
                                            {product.transfers.length > 0 ? (
                                                <ul className="list-disc pl-4">
                                                    {product.transfers.map(transfer => (
                                                        <li key={transfer.id}>
                                                            Moved from <strong>{transfer.source_location?.name || "Unknown"}</strong>  
                                                            to <strong>{transfer.destination_location?.name || "Unknown"}</strong>  
                                                            ({transfer.quantity} pcs)
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>No transfers</span>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="border p-2 space-x-2">
                                            <Link href={`/products/${product.id}/edit`} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(product.id)} 
                                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                            <Link href={`/products/${product.id}/product-transfer`} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                                                Transfer
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
