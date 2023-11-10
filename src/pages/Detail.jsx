import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Detail = () => {
  const params = useParams();
  const firebase = useFirebase();
  const [data, setData]= useState(null);
 const [url, setUrl] = useState(null);
 const [qty, setQty]= useState(1);

  useEffect(()=>{
    firebase.getBookId(params.bookId).then((value)=>setData(value.data()));
  },[])

  useEffect(()=>{
    if(data){
        const imageUrl = data.imageUrl;
        firebase.getImageUrl(imageUrl).then((url)=>setUrl(url));
    }
  }, [data])

  if(data==null) return <h1> Loading...</h1>

 const placeorder = async()=>{
    await firebase.placeOrder(params.bookId,qty);
 }
 
  return (
    <div className='container mt-3'>
    <h1>{data.name}</h1>
        <img src={url} width="505" style={{borderRadius: "10px"}}></img>
        <h1>Details</h1>
        <p>Price: Rs.{data.price}</p>
        <p>ISBN Number. {data.isbn}</p>
        <h1>Owner Details</h1>
        <p>Name:{data.displayName}</p>
        <p>Email: {data.userEmail}</p>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
        onChange={(e)=> setQty(e.target.value)}
        value={qty}
         type="number" placeholder="Enter Quantity" />
      </Form.Group>
        <Button onClick={placeorder} variant='success'>Buy Now</Button>
    </div>
  )
}

export default Detail;
