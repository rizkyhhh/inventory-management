import React, { useState, useEffect } from "react";
import { useForm, usePage, Link } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function TransferProduct() {
    const { product, locations = [], transfers = [] } = usePage().props;

    const [sourceLocation, setSourceLocation] = useState(null);
    const [sourceStock, setSourceStock] = useState(0);
    const [filteredDestinations, setFilteredDestinations] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        source_location_id: product.location_id || "",
        destination_location_id: "",
        quantity: "",
    });

    useEffect(() => {
        if (product.location_id) {
            const productLocation = locations.find(loc => loc.id === product.location_id);
            setSourceLocation(productLocation);

            let storedQuantity = Number(product.stock) || 0;
            let transferredOut = transfers.filter(t => t.source_location_id === product.location_id)
                .reduce((sum, t) => sum + (Number(t.quantity) || 0), 0);
            let transferredIn = transfers.filter(t => t.destination_location_id === product.location_id)
                .reduce((sum, t) => sum + (Number(t.quantity) || 0), 0);

            setSourceStock(storedQuantity - transferredOut + transferredIn);

            setFilteredDestinations(locations.filter(loc => loc.id !== product.location_id));
        }
    }, [product, locations, transfers]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.quantity > sourceStock) {
            alert("Not enough stock at source location.");
            return;
        }
        post(`/products/${product.id}/product-transfer`, {
            onSuccess: () => {
                reset();
                alert('Product transferred successfully');
            },
            onError: () => {
                alert('Error occurred while transferring the product');
            }
        });
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-700 mb-4">Transfer Product: {product.name}</h1>
                <Link href="/products" className="text-blue-500 hover:underline">Back to Products</Link>
                
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Source Location:</label>
                        <p className="text-gray-800 font-semibold">
                            {sourceLocation 
                                ? `${sourceLocation.name} - Branch: ${sourceLocation.branch_name}, Building: ${sourceLocation.building_name}, Floor: ${sourceLocation.floor_name}, Room: ${sourceLocation.room_name}`
                                : "No Location Assigned"}
                        </p>
                        <p className="text-gray-500">Available Stock: <strong>{sourceStock} pcs</strong></p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Destination Location:</label>
                        <select
                            className="w-full p-2 border rounded-lg"
                            value={data.destination_location_id}
                            onChange={(e) => setData("destination_location_id", e.target.value)}
                            required
                        >
                            <option value="">Select Location</option>
                            {filteredDestinations.map(location => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                        {errors.destination_location_id && <p className="text-red-500 text-sm">{errors.destination_location_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Quantity:</label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-lg"
                            placeholder={sourceStock > 0 ? `Max: ${sourceStock} pcs` : "Enter quantity"}
                            value={data.quantity}
                            onChange={(e) => setData("quantity", e.target.value)}
                            required
                            min="1"
                            max={sourceStock || ""}
                        />
                        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-2 text-white font-semibold rounded-lg ${processing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={processing || !data.destination_location_id || data.quantity < 1 || data.quantity > sourceStock}
                    >
                        {processing ? "Transferring..." : "Transfer"}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
