import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        branch_id: "",
        building_id: "",
        floor_id: "",
        room_id: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/locations");
    };

    return (
        <div>
            <h1>Add Location</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Location Name" value={data.name} onChange={handleChange} required />
                {errors.name && <p>{errors.name}</p>}

                <input type="text" name="branch" placeholder="Branch" value={data.branch} onChange={handleChange} required />
                {errors.branch && <p>{errors.branch}</p>}

                <input type="text" name="building" placeholder="Building" value={data.building} onChange={handleChange} required />
                {errors.building && <p>{errors.building}</p>}

                <input type="text" name="floor" placeholder="Floor" value={data.floor} onChange={handleChange} required />
                {errors.floor && <p>{errors.floor}</p>}

                <input type="text" name="room" placeholder="Room" value={data.room} onChange={handleChange} required />
                {errors.room && <p>{errors.room}</p>}

                <button type="submit" disabled={processing}>Submit</button>
            </form>
        </div>
    );
}
