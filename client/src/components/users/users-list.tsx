// import { FunctionComponent, useEffect, useState } from "react";
// import { useCreateUser, useDeleteUser, useUsers } from "../../queries/users/user-queries";
// import { User } from "../../types";

// const UsersList: FunctionComponent = (data) => {

//     const [page, setPage] = useState(1);
//     const ITEMS_PER_PAGE: number = 10;

//     // Query hooks
//     const { isLoading, error } = useUsers({
//         page,
//         limit: ITEMS_PER_PAGE,
//     })

//     // Mutation hooks
//     const createUser = useCreateUser();
//     const deleteUser = useDeleteUser();

//     // Handle user deletion
//     const handleDelete = async (id: string) => {
//         try {
//             await deleteUser.mutateAsync(id);
//             alert('User deleted successfully');
//         } catch (err) {
//             console.error('Failed to delete user:', err);
//             alert('Failed to delete user');
//         }
//     }

//     // Handle user creation
//     const handleCreate = async (user: User) => {
//         try {
//             await createUser.mutateAsync(user);
//         } catch (err) {
//             console.error('Failed to create user:', err);
//             alert('Failed to create user');
//         }
//     }

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
//     if (data?.data?.length) return <div>No Users found</div>;


//     return (
//         <div>
//             <h1>Users List</h1>
//             <div className="users-grid">
//                 {data && data?.data?.map((user) => (
//                     <div key={user.id}>
//                         <h2>{user.name}</h2>
//                         <button onClick={() => handleDelete(user.id)}>Delete</button>
//                     </div>
//                 ))}
//             </div>

//             <div className="pagination">
//                 <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
//                 <span>Page {page}</span>
//                 <button disabled={!data?.hasMore} onClick={() => setPage(page + 1)}>Next</button>
//             </div>
//         </div>


//     )
// }

// export default UsersList;