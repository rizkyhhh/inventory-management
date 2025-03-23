import { Link, usePage } from "@inertiajs/react";
import DashboardLayout from "@/Layouts/DashboardLayout";

export default function Index() {
    const { locations } = usePage().props;

    return (
        <DashboardLayout>
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-700">Locations</h1>
                    <Link href="/locations/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                        Add Location
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr className="text-left">
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Branch</th>
                                <th className="border border-gray-300 px-4 py-2">Building</th>
                                <th className="border border-gray-300 px-4 py-2">Floor</th>
                                <th className="border border-gray-300 px-4 py-2">Room</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.length > 0 ? (
                                locations.map((location) => (
                                    <tr key={location.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{location.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{location.branch?.name || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{location.building?.name || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{location.floor?.name || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2">{location.room?.name || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            <Link 
                                                href={`/locations/${location.id}/edit`} 
                                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
                                            >
                                                Edit
                                            </Link>
                                            <Link 
                                                href={`/locations/${location.id}`} 
                                                method="delete" 
                                                as="button" 
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center text-gray-500 py-4">
                                        No locations found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
}
