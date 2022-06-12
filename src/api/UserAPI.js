import React, {useState, useEffect} from 'react'
import axios from 'axios'

//4:18:00
function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(true)
    const [isAdmin, setIsAdmin] = useState(true)

    useEffect(() => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                }catch(err){
                    alert(err.response.data.message)
                }
            }

            getUser()
        }
    }, [token])
    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin]
    }
}

export default UserAPI