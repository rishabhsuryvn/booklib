import { async } from '@firebase/util';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

const List = () => {
    const firebase = useFirebase();
    const [name, setName]= useState('');
    const [isbnNo, setIsbnNo]= useState('');
    const [price, setPrice]= useState('');
    const [coverPic, setCoverPic]= useState('');

    const handleSubmit= async (e)=>{
        e.preventDefault();
      await firebase.createNewList(name, isbnNo,price, coverPic);

    }
  return (
    <div className='container mt-5'>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Name</Form.Label>
        <Form.Control
        onChange={(e)=> setName(e.target.value)}
        value={name}
         type="text" placeholder="Enter book name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>ISBN</Form.Label>
        <Form.Control 
        onChange={(e)=> setIsbnNo(e.target.value)}
        value={isbnNo}
        type="text" placeholder="ISBN Number" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control 
        onChange={(e)=> setPrice(e.target.value)}
        value={price}
        type="text" placeholder="enter price" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cover Pic</Form.Label>
        <Form.Control 
        onChange={(e)=> setCoverPic(e.target.files[0])}
        type="file" placeholder="ISBN Number" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
     </div>
  )
}

export default List
