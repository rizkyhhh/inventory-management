import React from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

const EditProduct = () => {
    const { product, categories, statuses, locations } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category_id: product.category_id,
        status_id: product.status_id,
        location_id: product.locations?.length > 0 ? product.locations[0].id : ""
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/${product.id}`); // Submit data to Laravel
    };

    return (
        <div>
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={data.name} onChange={handleChange} required />
                {errors.name && <p>{errors.name}</p>}

                <input type="number" name="price" value={data.price} onChange={handleChange} required />
                {errors.price && <p>{errors.price}</p>}

                <input type="number" name="stock" value={data.stock} onChange={handleChange} required />
                {errors.stock && <p>{errors.stock}</p>}

                <select name="category_id" value={data.category_id} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category_id && <p>{errors.category_id}</p>}

                <select name="status_id" value={data.status_id} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    {statuses?.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.status}
                        </option>
                    ))}
                </select>
                {errors.status_id && <p>{errors.status_id}</p>}

                <select name="location_id" value={data.location_id} onChange={handleChange} required>
                    <option value="">Select Location</option>
                    {locations?.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
                {errors.location_id && <p>{errors.location_id}</p>}

                <button type="submit" disabled={processing}>Update</button>
            </form>
        </div>
    );
};

export default EditProduct;
