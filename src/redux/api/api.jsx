import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/v1"
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
            })
        })
    })
})

export const {
    useUserLoginMutation,
    useUserRegisterMutation,
    useBillingListQuery
} = api;