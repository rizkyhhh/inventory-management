import { useForm, Link } from '@inertiajs/react';

export default function Index({ products }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            destroy(`/products/${id}`); 
        }
    };

    return (
        <div>
            <h1>Products</h1>
            <Link href="/products/create" className="btn btn-primary">Add Product</Link>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Image</th>
                        <th>Current Location</th>
                        <th>Transfer History</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.stock}</td>
                            <td>${product.price}</td>
                            <td>{product.category ? product.category.name : "No Category"}</td>
                            <td>{product.status ? product.status.status : "No Status"}</td>
                            <td>
                                {product.image && (
                                    <img src={`/storage/${product.image}`} alt={product.name} width="50" />
                                )}
                            </td>

                           
                            <td>
                                {product.locations && product.locations.length > 0 ? (
                                    product.locations.map(location => (
                                        <div key={location.id}>
                                            {location.name} - {location.pivot.quantity} pcs
                                        </div>
                                    ))
                                ) : (
                                    <span>No location assigned</span>
                                )}
                            </td>

                            <td>
                                {product.transfers && product.transfers.length > 0 ? (
                                    <ul>
                                        {product.transfers.map((transfer) => (
                                        <li key={transfer.id}>
                                            Moved from <strong>{transfer.sourceLocation?.name || "Unknown"}</strong>  
                                            to <strong>{transfer.destinationLocation?.name || "Unknown"}</strong>  
                                            ({transfer.quantity} pcs)
                                        </li>
                                    ))}
                                    </ul>
                                ) : (
                                    <span>No transfers</span>
                                )}
                            </td>

                         
                            <td>
                                <Link href={`/products/${product.id}/edit`} className="btn btn-warning">Edit</Link>
                                <button onClick={() => handleDelete(product.id)} className="btn btn-danger">Delete</button>
                            </td>

                            <td>
                            <Link href={route("product-transfers.create", product.id)}>Transfer Product</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
