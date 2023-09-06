
import { useState, useEffect, useRef } from "react";    
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function NoteForm( { user_id, album_id, track_id} ) {
    const content = useRef();



    const onSubmit = async (event) => {
        event.preventDefault();

        const route = track_id ? `/api/albums/${user_id}/${album_id}/${track_id}/note` : `/api/albums/${user_id}/${album_id}/note`;
        console.log(route);
        
        const response = await fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id, album_id, track_id, content: content.current.value })
        });
        if (response.ok) {
            content.current.value = "";
            const results = await response.json();
            console.log(results);
        }
        else {
            console.log('Error');
        }
    };    

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="content">
                
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    ref={content} 
                    placeholder={'whats on your mind...'}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add new note
            </Button>
        </Form>
    );




}