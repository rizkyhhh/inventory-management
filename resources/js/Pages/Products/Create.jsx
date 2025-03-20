import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

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

        const selectedLocation = locations.find((loc) => loc.id === parseInt(selectedLocationId));

        if (selectedLocation) {
            setData("branch_id", selectedLocation.branch_id || "");
            setData("building_id", selectedLocation.building_id || "");
            setData("floor_id", selectedLocation.floor_id || "");
            setData("room_id", selectedLocation.room_id || "");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/products/store"); 
    };

    return (
        <div>
            <h1>Create a New Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Product Name" value={data.name} onChange={handleChange} required />
                {errors.name && <p>{errors.name}</p>}

                <input type="number" name="price" placeholder="Price" value={data.price} onChange={handleChange} required />
                {errors.price && <p>{errors.price}</p>}

                <input type="number" name="stock" placeholder="Stock" value={data.stock} onChange={handleChange} required />
                {errors.stock && <p>{errors.stock}</p>}

            
                <select name="category_id" value={data.category_id} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

               
                <select name="status_id" value={data.status_id} onChange={handleChange} required>
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.status}
                        </option>
                    ))}
                </select>

            
                <select name="location_id" value={data.location_id} onChange={handleLocationChange} required>
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
                {errors.location_id && <p>{errors.location_id}</p>}

             
                <select name="branch_id" value={data.branch_id} onChange={handleChange} required>
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                            {branch.name}
                        </option>
                    ))}
                </select>
                {errors.branch_id && <p>{errors.branch_id}</p>}

                <select name="building_id" value={data.building_id} onChange={handleChange} required>
                    <option value="">Select Building</option>
                    {buildings.map((building) => (
                        <option key={building.id} value={building.id}>
                            {building.name}
                        </option>
                    ))}
                </select>
                {errors.building_id && <p>{errors.building_id}</p>}

    
                <select name="floor_id" value={data.floor_id} onChange={handleChange} required>
                    <option value="">Select Floor</option>
                    {floors.map((floor) => (
                        <option key={floor.id} value={floor.id}>
                            {floor.name}
                        </option>
                    ))}
                </select>
                {errors.floor_id && <p>{errors.floor_id}</p>}

                <select name="room_id" value={data.room_id} onChange={handleChange} required>
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
                {errors.room_id && <p>{errors.room_id}</p>}

                <input type="file" name="image" onChange={handleImageChange} accept="image/*" />
                {errors.image && <p>{errors.image}</p>}

                <button type="submit" disabled={processing}>Submit</button>
            </form>
        </div>
    );
};

export default CreateProduct;
