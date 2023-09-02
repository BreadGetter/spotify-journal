
import { useState, useEffect, useRef } from "react";    
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Route } from "react-router-dom";


export default function NoteForm( { user_id, album_id, currContent, track_id} ) {
    const content = useRef();

    useEffect(() => {
        content.current.focus();
    }, []);

    console.log(album_id);


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

    console.log(currContent);

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows={3} 
                    ref={content} 
                    placeholder={currContent}
                    defaultValue={currContent}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {currContent ? 'Update Note' : 'Add Note'}
            </Button>
        </Form>
    );




}