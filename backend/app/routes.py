from flask import jsonify, url_for, request, Response
from app import app, db, models
from app.models import User, Album, Track, Note
from datetime import datetime
from sqlalchemy import desc

# route to test if connection to frontend is working, no auth required
@app.route('/test', methods=['GET'])
def test():
    return {'message': 'Hello from Flask!'}


#write a route that sends all of a users album data to client 
@app.route('/api/albums/<int:user_id>', methods=['GET'])
def get_albums(user_id):
    albums = Album.query.filter_by(user_id=user_id).all()
    album_list = []
    
    for album in albums:
        album_data = {
            'id': album.id,
            'user_id': album.user_id,
            'cover_url': album.cover_url,
            'title': album.title,
            'artist': album.artist,
            'release_date': album.release_date.strftime('%Y-%m-%d'),
            'total_tracks': album.total_tracks,
        }
        album_list.append(album_data)
       
    return jsonify(album_list)

# route that sends all data of a specific album including all tracks and notes
@app.route('/api/albums/<int:user_id>/<int:album_id>', methods=['GET'])
def get_album(user_id, album_id):
    
    album = Album.query.filter_by(user_id=user_id, id=album_id).first()
    
    album_data = { 
        'id': album.id,
        'cover_url': album.cover_url,
        'user_id': album.user_id,
        'title': album.title,
        'artist': album.artist,
        'release_date': album.release_date.strftime('%Y-%m-%d'),
        'total_tracks': album.total_tracks,
        'tracks': [],
        'note': None if album.note is None else { 
                 'content': album.note.content if album.note else None,
                 'timestamp': album.note.timestamp.strftime('%Y-%m-%d %H:%M:%S') if album.note else None
        }
    }
    
    for track in album.tracks:
        track_data = {
            'id': track.id,
            'title': track.title,
            'duration': track.duration, 
            'note': None if track.note is None else {
                 'content': track.note.content if track.note else None,
                 'timestamp': track.note.timestamp.strftime('%Y-%m-%d %H:%M:%S') if track.note else None
            }   
        }
        album_data['tracks'].append(track_data)

    return jsonify(album_data)

# route where user can add or edit note to album
@app.route('/api/albums/<int:user_id>/<int:album_id>/note', methods=[ 'POST'])
def add_album_note(user_id, album_id):
    
        # dont add note if content is empty
        if request.get_json()['content'] == '':
            return jsonify({'message': 'Note cannot be empty!'}, 400)
        # dont add note if identical note already exists
        if Note.query.filter_by(user_id=user_id, album_id=album_id, content=request.get_json()['content']).first():
            return jsonify({'message': 'Note already exists!'}, 400)
        
        data = request.get_json()
        print(data)
        user_id = data['user_id']
        album_id = data['album_id']
        content = data['content']

 
        note = Note(user_id=user_id, album_id=album_id, content=content)
        db.session.add(note)

        db.session.commit()

        return jsonify({'message': 'Note added successfully!', 'note_content' : note.content}, 201)
    
# route where user can add or edit note to track
@app.route('/api/albums/<int:user_id>/<int:album_id>/<int:track_id>/note', methods=['POST'])
def add_track_note(user_id, album_id, track_id):
        data = request.get_json()
        print(data)
        user_id = data['user_id']
        track_id = data['track_id']
        content = data['content']

        note = Note(user_id=user_id, track_id=track_id, content=content)
          
        db.session.add(note)
        db.session.commit()

        return jsonify({'message': 'Note added successfully!', 'note_content' : note.content, 'timestamp': note.timestamp}, 201)
    
    
# route where user can get all notes of a track 
@app.route('/api/albums/<int:user_id>/<int:album_id>/<int:track_id>/notes', methods=['GET'])
def get_track_notes(user_id, album_id, track_id):
    notes = Note.query.filter_by(user_id=user_id, track_id=track_id).order_by(desc(Note.timestamp)).all()
    note_list = []
    
    for note in notes:
        note_data = {
            'id': note.id,
            'user_id': note.user_id,
            'album_id': note.album_id,
            'track_id': note.track_id,
            'content': note.content,
            'timestamp': note.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }
        note_list.append(note_data)
       
    return jsonify(note_list)

# route where user can get all notes of an album
@app.route('/api/albums/<int:user_id>/<int:album_id>/notes', methods=['GET'])
def get_album_notes(user_id, album_id):
    notes = Note.query.filter_by(user_id=user_id, album_id=album_id).order_by(desc(Note.timestamp)).all()
    note_list = []
    
    for note in notes:
        note_data = {
            'id': note.id,
            'user_id': note.user_id,
            'album_id': note.album_id,
            'track_id': note.track_id,
            'content': note.content,
            'timestamp': note.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }
        note_list.append(note_data)
       
    return jsonify(note_list)

# route to get all notes of all albums
@app.route('/api/<int:user_id>/albums/notes', methods=['GET'])
def get_all_album_notes(user_id):
    notes = Note.query.filter_by(user_id=user_id, track_id=None).order_by(desc(Note.timestamp)).all()
    note_list = []
    
    for note in notes:
        album = Album.query.filter_by(id=note.album_id).first()
        note_data = {
            'id': note.id,
            'user_id': note.user_id,
            'artist': album.artist,
            'album_id': album.id,
            'album_name': album.title,
            'content': note.content,
            'timestamp': note.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'cover_url': album.cover_url
        }
        note_list.append(note_data)
       
    return jsonify(note_list)

# route to get all notes of all tracks
@app.route('/api/<int:user_id>/tracks/notes', methods=['GET'])
def get_all_track_notes(user_id):
    notes = Note.query.filter_by(user_id=user_id, album_id=None).order_by(desc(Note.timestamp)).all()
    note_list = []
    
    for note in notes:
        # find album name, track name and artist based on track_id
        track = Track.query.filter_by(id=note.track_id).first()
        album = Album.query.filter_by(id=track.album_id).first()
        note_data = {
            'id': note.id,
            'user_id': note.user_id,
            'artist': album.artist,
            'album_id': album.id,
            'track_name': track.title,
            'album_name': album.title,
            'content': note.content,
            'timestamp': note.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'cover_url': album.cover_url
        }
        note_list.append(note_data)
       
    return jsonify(note_list)




    



