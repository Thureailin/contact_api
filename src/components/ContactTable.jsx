import React, { useEffect } from 'react'
import { Input,  Table } from '@mantine/core';
import { useDeleteContactMutation, useGetContactQuery } from '../redux/api/contactApi';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, setSearchTerms } from '../redux/services/contactSlice';
import { Loader } from '@mantine/core';
import Swal from 'sweetalert2';


const ContactTable = () => {

   
    const contacts = useSelector(state => state.contactSlice.contacts) 
    const searchTerms = useSelector(state =>state.contactSlice.searchTerms)
    const dispatch = useDispatch()
    const token = Cookies.get("token")
    const {data,isLoading} = useGetContactQuery(token);
    const [deleteContact] = useDeleteContactMutation()
    // console.log(data)

    useEffect(()=>{
      dispatch(addContacts(data?.contacts?.data))
  },[data])


if(isLoading){
  return(
    <div className='flex justify-center items-center  h-screen '>
    <Loader color="orange" variant="bars" />
    </div>
  )

}

const deleteHandler = (id) =>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
      const data = await deleteContact({id,token});
      // console.log(data)
    }
  });
    
  
    
}

  return (
    <>
    <div className='flex gap-3 my-5 px-5'>
    <Link to={'/create'}>
    <button  className='rounded-[6px] bg-gray-800 text-white px-6 py-1'>Create Contact</button>
    </Link>
    <Input variant="filled" placeholder='Search ....' value={searchTerms} onChange={(e)=>dispatch(setSearchTerms(e.target.value))}/>
    </div>
    <div className='mt-20 px-5'>
         <Table highlightOnHover withBorder >
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
  
          <th>Delete</th>
         
        </tr>
      </thead>
      <tbody>
                {contacts?.filter((item)=>{
                  if(searchTerms === ""){
                      return item;
                  }

                  else if( item?.name.toLowerCase().includes(searchTerms?.toLowerCase())){
                    return contacts;
                  }

                }).map(contact=>{
                
                    return(
                        <tr key={contact.id} >
                            <td>{contact?.name}</td>
                            <td>{contact?.email === null ? 'example@gmail.com' : contact?.name }</td>
                            <td>{contact?.address === null ? 'Bahan Township' : contact?.address }</td>
                            <td>{contact?.phone === null ? '09956798601' : contact?.phone}</td>
                            
                            <td>
                              <button onClick={() => deleteHandler(contact?.id)} className='text-center bg-red-800 text-white px-2 py-1 rounded-[6px]'>Delete</button>
      
                              </td>
                              
                         </tr>
                    )
                })}
      </tbody>
    </Table>
      
    </div>
    </>
  )
}

export default ContactTable
