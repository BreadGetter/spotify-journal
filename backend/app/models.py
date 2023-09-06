from app import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    spotify_id = db.Column(db.String(120), nullable=False)
    display_name = db.Column(db.String(120), nullable=False)
    image_url = db.Column(db.String(120), nullable=False)
    albums = db.relationship('Album', backref='user', lazy=True)
    tracks = db.relationship('Track', backref='user', lazy=True)
    notes = db.relationship('Note', backref='user', lazy=True)
    
    def __repr__(self):
        return f'<User {self.display_name}>'

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    cover_url = db.Column(db.String(120), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    artist = db.Column(db.String(120), nullable=False)
    release_date = db.Column(db.Date, nullable=False)
    total_tracks = db.Column(db.Integer, nullable=False)
    tracks = db.relationship('Track', backref='album', lazy=True)
    note = db.relationship('Note', backref='album', uselist=False)
    rating = db.Column(db.Integer, nullable=False, default=0)
    
    def __repr__(self):
        return f'<Album {self.title}>'
    
class Track(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    note = db.relationship('Note', backref='track', uselist=False)
    rating = db.Column(db.Integer, nullable=False, default=0)
    track_no = db.Column(db.Integer, nullable=False)
    is_bookmarked = db.Column(db.Boolean, nullable=False, default=False)
    
    def __repr__(self):
        return f'<Track {self.title}>'
    
class Note(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey('album.id'), nullable=True)
    track_id = db.Column(db.Integer, db.ForeignKey('track.id'), nullable=True)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self):
        return f'<Note {self.id}>'
    

    
    

    
