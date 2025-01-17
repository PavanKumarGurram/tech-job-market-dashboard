import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://user:password@localhost/dbname'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # OAuth credentials
    OAUTH_CREDENTIALS = {
        'linkedin': {
            'id': os.environ.get('LINKEDIN_CLIENT_ID') or 'YOUR_CONSUMER_KEY',
            'secret': os.environ.get('LINKEDIN_CLIENT_SECRET') or 'YOUR_CONSUMER_SECRET'
        }
    }
