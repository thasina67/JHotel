import { useMutation, useQueryClient } from "react-query"
import *as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext"


const SignOutButton= () => {
      const queryClient = useQueryClient()     //useQuery is a custom hook within React Query used to fetch data in a React application
    const { showToast} = useAppContext()

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({message: "Signed Out!", type:"SUCCESS"})
            //showToast.The toast component can be used to show notifications to your users in a non-intrusive way by positioning it to the corner of the screen
        },
        onError: (error: Error) => {
            showToast({message:error.message, type:"ERROR"})
            //showToast
        },
    })
                           
    const handleClick = () => {
        mutation.mutate()
    }

    return(
        <button 
        onClick={handleClick}
        className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">
            Sign Out
        </button>
    )
}

export default SignOutButton