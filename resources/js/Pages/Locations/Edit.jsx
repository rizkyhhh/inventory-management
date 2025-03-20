import { useForm, usePage } from '@inertiajs/react';

export default function EditLocation() {
    const { location, branches, buildings, floors, rooms} = usePage().props; // Get location data
    const { data, setData, put, processing, errors } = useForm({
        name: location.name,
        branch_id: location.branch_id,
        building_id: location.building_id,
        floor_id: location.floor_id,
        room_id: location.room_id,
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/locations/${location.id}`); // Send update request
    };

    return (
        <div>
             <h1>Edit Location</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                />
                {errors.name && <p>{errors.name}</p>}

                <select
                    name="branch_id"
                    value={data.branch_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Branch</option>
                    {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                            {branch.name}
                        </option>
                    ))}
                </select>
                {errors.branch_id && <p>{errors.branch_id}</p>}

                <select
                    name="building_id"
                    value={data.building_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Building</option>
                    {buildings.map((building) => (
                        <option key={building.id} value={building.id}>
                            {building.name}
                        </option>
                    ))}
                </select>
                {errors.building_id && <p>{errors.building_id}</p>}

                <select
                    name="floor_id"
                    value={data.floor_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Floor</option>
                    {floors.map((floor) => (
                        <option key={floor.id} value={floor.id}>
                            {floor.name}
                        </option>
                    ))}
                </select>
                {errors.floor_id && <p>{errors.floor_id}</p>}

                <select
                    name="room_id"
                    value={data.room_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Room</option>
                    {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                            {room.name}
                        </option>
                    ))}
                </select>
                {errors.room_id && <p>{errors.room_id}</p>}

                <button type="submit" disabled={processing}>Update</button>
            </form>
        </div>
    );
}
