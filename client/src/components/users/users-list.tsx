import { FunctionComponent } from "react";
import { usersQueryOptions } from "../../routes/users";
import { useQuery } from "@tanstack/react-query";
import './users-list.css'

const UsersList: FunctionComponent = () => {

    const page = 1; // @TODO make this dynamic
    const limit = 10;
    const { data: paginatedData, isLoading, error } = useQuery(usersQueryOptions(page, limit));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Access the data property of PaginatedResponse
    const users = paginatedData?.data || [];

    return (
        <div>
            <h1>Users</h1>
            <div className="user-grid">
                {users.map((user) => (
                    <div key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <p>Description here ...</p>
                        <div className="user-details">
                            <span>Email: {user.email}</span>
                            <span>Age: {user.age}</span>
                        </div>
                        <div className="user-actions">
                            <button
                                onClick={() => console.log('handle delete of user')}
                                disabled={false}
                            >
                                {'Delete'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Implement Pagination Controls */}
            <button disabled={page === 1}>Previous</button>
            <button>Next</button>
        </div>
    );
}

export default UsersList;