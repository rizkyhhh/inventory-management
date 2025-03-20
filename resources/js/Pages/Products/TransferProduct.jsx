import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function TransferProduct() {
    const { products = [], locations = [] } = usePage().props;

    const [sourceStock, setSourceStock] = useState(0);
    const [filteredDestinations, setFilteredDestinations] = useState(locations); // Default to all locations

    const { data, setData, post, processing, errors } = useForm({
        product_id: "",
        source_location_id: "",
        destination_location_id: "",
        quantity: "",
    });

    
    useEffect(() => {
        setData(prev => ({
            ...prev,
            source_location_id: "",
            destination_location_id: "",
            quantity: "",
        }));
        setSourceStock(0);
        setFilteredDestinations(locations);
    }, [data.product_id]);

    
    useEffect(() => {
        if (data.source_location_id) {
            const sourceLoc = locations.find(loc => loc.id == data.source_location_id);
            if (sourceLoc) {
                setFilteredDestinations(locations.filter(loc => loc.branch === sourceLoc.branch && loc.id !== sourceLoc.id));
                setSourceStock(sourceLoc.pivot?.quantity || 0);
            }
        } else {
            setFilteredDestinations(locations); 
            setSourceStock(0);
        }
    }, [data.source_location_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.source_location_id && data.quantity > sourceStock) {
            alert("Not enough stock at source location.");
            return;
        }
        post("/products/product-transfer");
    };

    return (
        <div>
            <h1>Transfer Product</h1>
            <form onSubmit={handleSubmit}>

          
                <label>Product:</label>
                <select name="product_id" value={data.product_id} onChange={(e) => setData("product_id", e.target.value)} required>
                    <option value="">Select Product</option>
                    {products.map(prod => (
                        <option key={prod.id} value={prod.id}>
                            {prod.name} (Stock: {prod.stock})
                        </option>
                    ))}
                </select>
                {errors.product_id && <p className="error">{errors.product_id}</p>}

                <label>Source Location (Leave empty for new assignment):</label>
                <select name="source_location_id" value={data.source_location_id} onChange={(e) => setData("source_location_id", e.target.value)}>
                    <option value="">Assign from Inventory</option>
                    {locations.map(loc => (
                        <option key={loc.id} value={loc.id}>
                            {loc.name} - {loc.branch} (Floor: {loc.floor}, Room: {loc.room}) - {loc.pivot?.quantity ?? 0} pcs
                        </option>
                    ))}
                </select>
                {errors.source_location_id && <p className="error">{errors.source_location_id}</p>}

                <label>Destination Location:</label>
                <select name="destination_location_id" value={data.destination_location_id} onChange={(e) => setData("destination_location_id", e.target.value)} required>
                    <option value="">Select Destination</option>
                    {filteredDestinations.map(loc => (
                        <option key={loc.id} value={loc.id}>
                            {loc.name} - {loc.branch} (Floor: {loc.floor}, Room: {loc.room})
                        </option>
                    ))}
                </select>
                {errors.destination_location_id && <p className="error">{errors.destination_location_id}</p>}

             
                <label>Quantity:</label>
                <input
                    type="number"
                    name="quantity"
                    placeholder={data.source_location_id ? `Max: ${sourceStock} pcs` : "Enter quantity"}
                    value={data.quantity}
                    onChange={(e) => setData("quantity", e.target.value)}
                    required
                    min="1"
                    max={data.source_location_id ? sourceStock : undefined}
                />
                {errors.quantity && <p className="error">{errors.quantity}</p>}

             
                <button type="submit" disabled={processing || (data.source_location_id && data.quantity > sourceStock)}>Transfer</button>
            </form>
        </div>
    );
}
