import { Link, usePage } from "@inertiajs/react";

export default function DashboardLayout({ children }) {
    const { auth } = usePage().props; // Get user data from Laravel

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4">
                <Link href="/dashboard" className="text-xl font-bold text-gray-700 mb-4 block hover:text-blue-600">
                    Inventory
                </Link>
                <nav>
                    <Link href="/products" className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded">
                        📦 Products
                    </Link>
                    <Link href="/locations" className="block py-2 px-4 text-gray-600 hover:bg-gray-200 rounded">
                        📍 Locations
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="relative">
                        <button className="bg-gray-200 px-4 py-2 rounded text-gray-700">
                            {auth.user.name} ▼
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
