from flask import jsonify, url_for, request, Response
from app import app, db, models
from app.models import User, Album, Track, Note

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
        'note': album.note
    }
    
    for track in album.tracks:
        track_data = {
            'id': track.id,
            'title': track.title,
            'duration': track.duration
        }
        album_data['tracks'].append(track_data)

    return jsonify(album_data)

# route where user can add or edit note to album
@app.route('/api/albums/<int:user_id>/<int:album_id>/note', methods=['POST', 'PUT'])
def add_album_note():
    data = request.get_json()
    user_id = data['user_id']
    album_id = data['album_id']
    content = data['content']
    
    note = Note(
        user_id=user_id,
        album_id=album_id,
        content=content
    )
    
    db.session.add(note)
    db.session.commit()
    
    return jsonify({'message': 'Note added successfully!'}, 201)

# route where user can edit note on album
@app.route('/api/albums/<int:user_id>/<int:album_id>/note', methods=['PUT'])
def edit_album_note():
    data = request.get_json()
    user_id = data['user_id']
    album_id = data['album_id']
    content = data['content']
    
    



