from flask import jsonify, url_for, request, Response
from app import app, db, models
from app.models import User, Album, Track, Note
from datetime import datetime
from sqlalchemy import desc

# route to test if connection to frontend is working, no auth required
@app.route('/', methods=['GET'])
def test():
    return {'message': 'Hello from Flask!'}


#route that sends all of a users album data to client 
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
        'rating': album.rating,
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
            'rating': track.rating,
            'track_no': track.track_no,
            'is_bookmarked': track.is_bookmarked,
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

# route where rating of album or track can be updated
@app.route('/api/albums/<int:user_id>/<int:item_id>/rating', methods=['POST'])
def update_rating(user_id, item_id):
    data = request.get_json()
    user_id = data['user_id']
    rating = data['rating']
    is_album = data['is_album']


    if is_album:
        album = Album.query.filter_by(user_id=user_id, id=item_id).first()
        album.rating = rating
        db.session.commit()
        print(rating)
        return jsonify({'message': 'Album rating updated successfully!', 'rating' : album.rating}, 201)
    else:
        track = Track.query.filter_by(user_id=user_id, id=item_id).first()
        track.rating = rating
        db.session.commit()
        print(rating)
        return jsonify({'message': 'Track rating updated successfully!', 'rating' : track.rating}, 201)
    
# route where bookmark of track can be updated
@app.route('/api/<int:user_id>/<int:track_id>/bookmark', methods=['POST'])
def update_bookmark(user_id, track_id):
    data = request.get_json()
    user_id = data['user_id']

    track = Track.query.filter_by(user_id=user_id, id=track_id).first()
    # reverse bookmark status 
    track.is_bookmarked = not track.is_bookmarked
    db.session.commit()
    if (track.is_bookmarked):
        print("added bookmark")
    else:
        print("removed bookmark")
    return jsonify({'message': 'Track bookmark updated successfully!', 'is_bookmarked' : track.is_bookmarked}, 201)

# get bookmarked tracks
@app.route('/api/<int:user_id>/tracks/bookmarks', methods=['GET'])
def get_bookmarks(user_id):
    tracks = Track.query.filter_by(user_id=user_id, is_bookmarked=True).all()
    track_list = []
    
    for track in tracks:
        album = Album.query.filter_by(id=track.album_id).first()
        track_data = {
            'id': track.id,
            'user_id': track.user_id,
            'artist': album.artist,
            'album_id': album.id,
            'track_name': track.title,
            'album_name': album.title,
            'rating': track.rating,
            'track_no': track.track_no,
            'is_bookmarked': track.is_bookmarked,
            'cover_url': album.cover_url
        }
        track_list.append(track_data)
       
    return jsonify(track_list)
    







    



