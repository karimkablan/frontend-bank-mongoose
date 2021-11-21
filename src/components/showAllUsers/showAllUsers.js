import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './showAllUsers.css';

const ShowAllUsers = () => {
    const [allUsers, setAllUsers] = useState([])

    // const URL = 'http://localhost:5001/api/users/'
    const URL = 'https://backend-api-bank-karim.herokuapp.com/api/users/'

    useEffect(() => {
        ( async() =>{
            await axios.get(URL).then(res =>{
                setAllUsers(res.data)
            })
        } )()
 
    }, [])

    const deleteHandler = async (id) => {
        const deleteRes = await axios.delete(URL+ id)
        if (deleteRes.status === 200) {
            const stateList = [...allUsers];
            let resultOfNonDeleted = stateList.filter((user) => {
                return user.id !== id
            })
            setAllUsers(resultOfNonDeleted)
        }
    }


 
    return (
        <div>
        <div className="container">
            <table className="rwd-table">
                <tbody>
                    <tr>
                        <th>Account Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Credit</th>
                        <th>Money</th>
                        <th>Password</th>
                        <th>Delete</th>
                    </tr>
                    {allUsers.map((e) => {
                        return (
                            <tr key={e._id}>
                                <td className="burdocolor">{e.acountId}</td>
                                <td>{e.name}</td>
                                <td>{e.email}</td>
                                <td>{e.credit}</td>
                                <td>{e.cash}</td>
                                <td>{e.password}</td>
                                <td>
                                    <input
                                        className="button-three"
                                        type="button"
                                        onClick={() => {
                                            deleteHandler(e._id);
                                        }}
                                        value="Delete"
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <br/>
        <br/>
    </div>
    )
}

export default ShowAllUsers ;
