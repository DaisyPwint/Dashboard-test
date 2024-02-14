import { apiSlice } from "../../app/services/apiSlice";

const customerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCustomers: builder.query({
            query: () => '/users',
        })
    })
})

export const { useGetAllCustomersQuery } = customerApiSlice;