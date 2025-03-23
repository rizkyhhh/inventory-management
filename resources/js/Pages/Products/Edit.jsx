import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

const EditProduct = () => {
    const { product, categories, statuses } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        name: product.name || "",
        price: product.price || "",
        stock: product.stock || "",
        category_id: product.category_id || "",
        status_id: product.status_id || "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleImageChange = (e) => {
        setData("image", e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <DashboardLayout>
            <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Name */}
                    <div>
                        <label className="block font-medium">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block font-medium">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block font-medium">Product Image</label>
                        <input type="file" name="image" onChange={handleImageChange} className="w-full p-2 border rounded" />
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block font-medium">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={data.stock}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-medium">Category</label>
                        <select
                            name="category_id"
                            value={data.category_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Category</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block font-medium">Status</label>
                        <select
                            name="status_id"
                            value={data.status_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Status</option>
                            {statuses?.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.status}
                                </option>
                            ))}
                        </select>
                        {errors.status_id && <p className="text-red-500 text-sm">{errors.status_id}</p>}
                    </div>

                    {/* Current Location (Read-Only) */}
                    <div>
                        <label className="block font-medium">Current Location</label>
                        <p className="p-2 border rounded bg-gray-100">{product?.locations?.[0]?.name || "Not Assigned"}</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {processing ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default EditProduct;
