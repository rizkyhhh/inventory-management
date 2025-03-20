import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { locations } = usePage().props;

    return (
        <div>
            <h1>Locations</h1>
            <Link href="/locations/create" className="btn btn-primary">Add Location</Link>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>Building</th>
                        <th>Floor</th>
                        <th>Room</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(location => (
                        <tr key={location.id}>
                            <td>{location.name}</td>                        
                            <td>{location.branch?.name || "N/A"}</td>
                            <td>{location.building?.name || "N/A"}</td>
                            <td>{location.floor?.name || "N/A"}</td>
                            <td>{location.room?.name || "N/A"}</td>
                            <td>
                                <Link href={`/locations/${location.id}/edit`} className="btn btn-warning">Edit</Link>
                                <Link href={`/locations/${location.id}`} method="delete" as="button" className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
