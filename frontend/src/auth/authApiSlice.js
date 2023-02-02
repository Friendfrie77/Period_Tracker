import { apiSlice} from '../../app/api/apiSlice';
export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        register: builder.mutation({
            query: credentials =>({
                url: '/signup',
                method: 'POST',
                body: {...credentials}
            })
        })
    }),
})


export const {
    useRegisterMutation
} = authApiSlice