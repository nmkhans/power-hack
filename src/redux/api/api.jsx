import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://nmk-power-hack.onrender.com/api/v1"
    }),
    tagTypes: ["users", "billings"],
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data
            })
        }),
        userRegister: builder.mutation({
            query: (data) => ({
                url: '/registration',
                method: "POST",
                body: data
            })
        }),
        billingList: builder.query({
            query: ({pageno, perpage, search, auth}) => ({
                url: `/billing-list?pageno=${pageno}&perpage=${perpage}&search=${search}`,
                headers: {
                    authorization: auth
                }
            }),
            providesTags: ["billings"]
        }),
        getSingleBilling: builder.query({
            query: (id) => `/get-single-billing/${id}`
        }),
        addBilling: builder.mutation({
            query: ({data, auth}) => ({
                url: "/add-billing",
                headers: {
                    authorization: auth
                },
                method: "POST",
                body: data
            }),
            invalidatesTags: ["billings"]
        }),
        updateBilling: builder.mutation({
            query: ({newData, id, auth}) => ({
                url: `/update-billing/${id}`,
                headers: {
                    authorization: auth
                },
                method: "PUT",
                body: newData
            }),
            invalidatesTags: ["billings"]
        }),
        deleteBilling: builder.mutation({
            query: ({id, auth}) => ({
                url: `/delete-billing/${id}`,
                headers: {
                    authorization: auth
                },
                method: "DELETE"
            }),
            invalidatesTags: ["billings"]
        }),
        getTotalSum: builder.query({
            query: () => "get-total-bill",
            invalidatesTags: ["billings"]
        })
    })
})

export const {
    useUserLoginMutation,
    useUserRegisterMutation,
    useBillingListQuery,
    useAddBillingMutation,
    useUpdateBillingMutation,
    useDeleteBillingMutation,
    useGetTotalSumQuery,
    useGetSingleBillingQuery
} = api;