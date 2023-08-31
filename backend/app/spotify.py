import tekore as tk
from flask import session, redirect, request
from app import app, db
from app.models import User, Album, Track, Note
from datetime import datetime

conf = tk.config_from_environment()

cred = tk.Credentials(*conf)
spotify = tk.Spotify()

auths = {}  # Ongoing authorisations: state -> UserAuth
users = {}  # User tokens: state -> token (use state as a user ID)

in_link = '<a href="/login">login</a>'
out_link = '<a href="/logout">logout</a>'
login_msg = f'You can {in_link} or {out_link}'



# in this route, the current users data should be set, and all their albums should be added to database
@app.route('/', methods=['GET'])
def main():
    user_id = session.get('user', None)
    token = users.get(user_id, None)

    # Return early if no login or old session
    if user_id is None or token is None:
        session.pop('user', None)
        return f'User ID: None<br>{login_msg}'
    
    page = ""; 
    if token.is_expiring:
        token = cred.refresh(token)
        users[user_id] = token
        
    try:
        with spotify.token_as(token):
            # get user data
            user_data = spotify.current_user()
            spotify_user_id = user_data.id
            print(f"Fetched user data for Spotify user ID: {spotify_user_id}")

            # Check if user with the given Spotify ID exists in the database
            user = db.session.query(User).filter_by(spotify_id=spotify_user_id).first()
            print(f"User: {user}")
            
            if not user: 
                # Create a new user with the given Spotify ID
                user = User(
                    spotify_id=spotify_user_id,
                    display_name=user_data.display_name,
                    image_url=user_data.images[0].url
                )
                db.session.add(user)
                db.session.commit()
                print(f"Created new user with Spotify ID: {spotify_user_id}")
            
            
            

            albums = spotify.saved_albums(limit=50)

            for album in albums.items:
                # if album already exists in the database, skip it (query by album name and artist)
                album_exists = db.session.query(Album).filter_by(title=album.album.name, artist=album.album.artists[0].name).first()
                if album_exists:
                    continue
                album_data = Album(
                    user_id= user.id,
                    cover_url = album.album.images[0].url,
                    title=album.album.name,
                    artist=album.album.artists[0].name,
                    release_date=datetime.strptime(album.album.release_date, '%Y-%m-%d'), 
                    total_tracks=album.album.total_tracks
                )
                db.session.add(album_data)
                db.session.commit()
          

                for track in album.album.tracks.items:
                    track_data = Track(
                        user_id=user.id,
                        album_id=album_data.id,
                        title=track.name,
                        duration=track.duration_ms
                    )                    
                
                    db.session.add(track_data)

            print("Albums and tracks added to the database.")

            db.session.commit()

    except tk.HTTPError as ex:
        page += '<br>Error in retrieving now playing!'
    
    
    return page

@app.route('/login', methods=['GET'])
def login():
    if 'user' in session:
        return redirect('/', 307)

    scope = tk.scope.every
    auth = tk.UserAuth(cred, scope)
    auths[auth.state] = auth
    return redirect(auth.url, 307)

@app.route('/callback', methods=['GET'])
def login_callback():
    code = request.args.get('code', None)
    state = request.args.get('state', None)
    auth = auths.pop(state, None)

    if auth is None:
        return 'Invalid state!', 400

    token = auth.request_token(code, state)
    session['user'] = state
    users[state] = token
    return redirect('/', 307)

@app.route('/logout', methods=['GET'])
def logout():
    uid = session.pop('user', None)
    if uid is not None:
        users.pop(uid, None)
    return redirect('/', 307)