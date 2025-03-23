import React from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import DashboardLayout from "../../Layouts/DashboardLayout";

const CreateProduct = () => {
    const { categories, statuses, locations, branches, buildings, floors, rooms } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        price: "",
        stock: "",
        category_id: "",
        status_id: "",
        image: null,
        location_id: "",
        branch_id: "", 
        building_id: "", 
        floor_id: "", 
        room_id: "", 
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleImageChange = (e) => {
        setData("image", e.target.files[0]); 
    };

    const handleLocationChange = (e) => {
        const selectedLocationId = e.target.value; 
        setData("location_id", selectedLocationId); 
    
        const selectedLocation = locations.find((loc) => String(loc.id) === selectedLocationId); 
    
        if (selectedLocation) {
            setData({
                ...data, 
                location_id: selectedLocation.id, 
                branch_id: selectedLocation.branch_id || "", 
                building_id: selectedLocation.building_id || "", 
                floor_id: selectedLocation.floor_id || "", 
                room_id: selectedLocation.room_id || "", 
            });
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/products/store"); 
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">Create a New Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input type="text" name="name" value={data.name} onChange={handleChange} required 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"/>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input type="number" name="price" value={data.price} onChange={handleChange} required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"/>
                        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input type="number" name="stock" value={data.stock} onChange={handleChange} required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"/>
                        {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select name="category_id" value={data.category_id} onChange={handleChange} required 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.category_id && <p className="text-red-500 text-sm">{errors.category_id}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select name="status_id" value={data.status_id} onChange={handleChange} required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                            <option value="">Select Status</option>
                            {statuses.map((status) => (
                                <option key={status.id} value={status.id}>{status.status}</option>
                            ))}
                        </select>
                        {errors.status_id && <p className="text-red-500 text-sm">{errors.status_id}</p>}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <select name="location_id" value={data.location_id} onChange={handleLocationChange} required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2">
                            <option value="">Select Location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                        </select>
                        {errors.location_id && <p className="text-red-500 text-sm">{errors.location_id}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Image</label>
                        <input type="file" name="image" onChange={handleImageChange} accept="image/*" 
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"/>
                        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button type="submit" disabled={processing}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow">
                            {processing ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default CreateProduct;
