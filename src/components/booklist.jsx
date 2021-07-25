import React, { useState } from 'react';
import {gql, useQuery,useMutation,useLazyQuery} from '@apollo/client';

const getBooksQuery = gql`
{
    books{
        name
        id
    }
}
`;

const getAuthorsQuery = gql`
{
	authors{
        name
        id
        book{
            name
            id
        }
    }
}
`;

const deleteBookQuery = gql`
mutation removeBook($id:String!){
    removeBook(id:$id){
        name
    }
}
`;

const UpdateBook = gql`
mutation updateBook($id:String!,$name:String!){
    updateBook(id:$id,name:$name){
        id
    }
}
`;


const BookList = () => {
    const [prevName,setPrevName] = useState('');
    const [updatedName,setUpdatedName] = useState('');
    const [updatedId,setUpdatedId] = useState('');
    const { loading} = useQuery(getBooksQuery);
    const [removeBook] = useMutation(deleteBookQuery);
    const [updateBookMut] = useMutation(UpdateBook);
    // const [lazyQuery,Auth] = useLazyQuery(getAuthorsQuery);
    const Auth = useQuery(getAuthorsQuery,{
        pollInterval:4000
    });
    
    
    const setUpdateFormInputs=(id,name)=>{
        setUpdatedId(id);
        setPrevName(name);
    }

    const deleteIt=(id)=>{
    removeBook({
        variables:{
            id:id
        }
    })
}


const updateBookName=()=>{
    updateBookMut({
        variables:{
            id:updatedId,
            name:updatedName
        }
    }).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err.message)
    })
}

console.log(Auth.data)

    return ( 

        <div>
            <h2>Lazy Fetch</h2>
            {/* <button onClick={()=>lazyQuery()}>Lazy Fetch</button> */}
          <div>
              <hr />
              <h2>Update Form</h2>
              <h3>Id</h3>
              <input disabled placeholder="select book to edit its name" type="text" value={updatedId}/>
              <h3>Current Name</h3>
              <input disabled placeholder="select book to edit its name" type="text" value={prevName}/>
              <h3>Name</h3>
              <input type="text" value={updatedName} onChange={e=>setUpdatedName(e.target.value)}/>
              <br />
              <button onClick={()=>updateBookName()}>Final Update</button>
          </div>
          
            <h1>
                BookList
            </h1>
            <button onClick={()=>Auth.refetch()}>Refetch It</button>
            <ul>
            {!Auth.loading &&

                Auth.data.authors.map((v,i)=>{
                    return(
                        <div key={v.id}>
                            <h3>
                                {v.name}
                            </h3>
                            <h3>
                                {v.id}
                            </h3>
                            <ul>
                            {!loading &&
                                v.book.map((a,b)=>{
                                    return(
                                    <li key={b}
                                    style={{listStyleType:'none'}}
                                    >
                                    <h3>
                                    {a.name}
                                    </h3>
                                <br />
                                <button
                                onClick={()=>deleteIt(a.id)}
                                >Delete It
                                </button>
                                <br />
                                <button
                                onClick={()=>setUpdateFormInputs(a.id,a.name)}
                                >Update It</button>
                                    </li>
                                    )
                                })
                            }
                            </ul>
                        </div>
                    )
                })
            }
            </ul>
        </div>
     );
}
 
export default BookList;


