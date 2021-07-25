import React, { useState } from 'react';
import {gql,useMutation} from '@apollo/client';
const Entry = () => {
    const [name,setName]=useState('');
    const [genre,setGenre]=useState('');
    const [authorId,setAuthorId]=useState('');
    

    const ADD_Book = gql`
  mutation Entry($nam:String!,$genr:String!,$author:ID!){
    addBook(name:$nam,genre:$genr,authorId:$author){
      name
      genre
    }
  }
`;
const [addBook] = useMutation(ADD_Book);
    

const AddItem=()=>{

    addBook({variables:{
        nam : name,
        genr : genre,
        author:authorId
    }}).then(res=>{
        console.log(res)
    }).catch(err=>{
        console.log(err.message)
    })

}


    return ( 
        <div>
            <h4>Name</h4>
            <input type="text" value={name}
            onChange={e=>setName(e.target.value)}
            />
            
            <br />
            <h4>Genre</h4>
            <input type="text" value={genre}
            onChange={e=>setGenre(e.target.value)}
            />
            <br />
            
            <h4>AuthorId</h4>
            <input type="text" value={authorId}
            onChange={e=>setAuthorId(e.target.value)}
            />
            <button
            
            onClick={()=>AddItem()}>Add</button>
        </div>
        );
}
 
export default Entry;