import DashboardLayout from "@/Layouts/DashboardLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function EditLocation() {
    const { location } = usePage().props; 

    const { data, setData, put, processing, errors } = useForm({
        name: location.name || "",
        branch: location.branch?.name || "",
        building: location.building?.name || "",
        floor: location.floor?.name || "",
        room: location.room?.name || "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/locations/${location.id}`);
    };

    return (
        <DashboardLayout>
            <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Edit Location</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Location Name */}
                    <div>
                        <label className="block font-medium">Location Name</label>
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

                    {/* Branch */}
                    <div>
                        <label className="block font-medium">Branch</label>
                        <input
                            type="text"
                            name="branch"
                            value={data.branch}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
                    </div>

                    {/* Building */}
                    <div>
                        <label className="block font-medium">Building</label>
                        <input
                            type="text"
                            name="building"
                            value={data.building}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {errors.building && <p className="text-red-500 text-sm">{errors.building}</p>}
                    </div>

                    {/* Floor */}
                    <div>
                        <label className="block font-medium">Floor</label>
                        <input
                            type="text"
                            name="floor"
                            value={data.floor}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {errors.floor && <p className="text-red-500 text-sm">{errors.floor}</p>}
                    </div>

                    {/* Room */}
                    <div>
                        <label className="block font-medium">Room</label>
                        <input
                            type="text"
                            name="room"
                            value={data.room}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                        {errors.room && <p className="text-red-500 text-sm">{errors.room}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        {processing ? "Updating..." : "Update Location"}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}
