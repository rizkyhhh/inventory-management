import { useForm } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function CreateLocation() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        branch: "",
        building: "",
        floor: "",
        room: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/locations");
    };

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-700 mb-4">Add New Location</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Location Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Branch:</label>
                        <input
                            type="text"
                            name="branch"
                            value={data.branch}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Building:</label>
                        <input
                            type="text"
                            name="building"
                            value={data.building}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.building && <p className="text-red-500 text-sm">{errors.building}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Floor:</label>
                        <input
                            type="text"
                            name="floor"
                            value={data.floor}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.floor && <p className="text-red-500 text-sm">{errors.floor}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600">Room:</label>
                        <input
                            type="text"
                            name="room"
                            value={data.room}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-lg"
                            required
                        />
                        {errors.room && <p className="text-red-500 text-sm">{errors.room}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`w-full p-2 text-white font-semibold rounded-lg ${processing ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                        disabled={processing}
                    >
                        {processing ? "Submitting..." : "Submit"}
                    </button>
                </form>
            </div>
        </DashboardLayout>
    );
}