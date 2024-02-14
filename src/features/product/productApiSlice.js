import { apiSlice } from "../../app/services/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => '/products'
        }),
        getAllCategories: builder.query({
            query: () => '/products/categories'
        }),
        getProduct: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET"
            })
        }),
        getCategory: builder.query({
            query: (category) => ({
                url: `/products/category/${category}`,
                method: "GET"
            })
        }),
        createProduct: builder.mutation({
            query: (newProduct) => ({
                    url: '/products',
                    method: "POST",
                    body: JSON.stringify(newProduct)
                }),
            invalidatesTags: ['products']
        }),
        editProduct: builder.mutation({
            query: ({productId: id,values}) => ({
                    url: `/products/${id}`,
                    method: "PATCH",
                    body: JSON.stringify(values)
                }),
            invalidatesTags: ['products']
        }),
        deleteProduct: builder.mutation({
            query: ({id}) => {
                console.log(id);
                return  ({
                    url: `products/${id}`,
                    method: "DELETE"
                })
            },
            invalidatesTags: ['products']
        })
    })
})

export const { useGetAllProductsQuery, useGetAllCategoriesQuery, useGetCategoryQuery, useGetProductQuery, useCreateProductMutation, useEditProductMutation, useDeleteProductMutation } = productApiSlice;