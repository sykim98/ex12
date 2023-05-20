import React from 'react'
import {Row,Col,Table,Button} from 'react-bootstrap'
import {app} from '../firebaseInit'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { useState } from 'react'
import { useEffect } from 'react'

const CartPage = () => {
    const uid = sessionStorage.getItem('uid');
    const db = getDatabase(app);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const getBooks = () => {
        setLoading(true);
        onValue(ref(db,`cart/${uid}`), (snapshot)=>{
            let rows=[];
            snapshot.forEach(row=>{
                rows.push({key:row.key, ...row.val()});
            });
            console.log(rows);
            setBooks(rows);  
        })
        setLoading(false);
    }

    useEffect(()=>{
        getBooks();
    }, []);

    if (loading) return <h1>로딩중..</h1>

  return (
    <Row>
        <Col>
            <h1>장바구니</h1>
            <Table>
                <thead>
                    <tr>
                        <td>제목</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book=>
                        <tr>{book.title}</tr>    
                    )}
                </tbody>
            </Table>
        </Col>
        
    </Row>
  )
}

export default CartPage