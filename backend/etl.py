import requests
import pandas as pd
import numpy as np
from sqlalchemy import create_engine

# LinkedIn API credentials
LINKEDIN_API_URL = 'https://api.linkedin.com/v2/jobPostings'
ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'

# Database configuration
DB_TYPE = 'postgresql'
DB_DRIVER = 'psycopg2'
DB_USER = 'user'
DB_PASS = 'password'
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'dbname'
DATABASE_URI = f'{DB_TYPE}+{DB_DRIVER}://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

# Create a database engine
engine = create_engine(DATABASE_URI)

def fetch_job_data():
    headers = {
        'Authorization': f'Bearer {ACCESS_TOKEN}'
    }
    response = requests.get(LINKEDIN_API_URL, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def transform_job_data(data):
    # Extract relevant fields from the data
    jobs = []
    for job in data['elements']:
        job_info = {
            'title': job['title'],
            'category': job['category'],
            'location': job['location'],
            'posting_date': job['postingDate']
        }
        jobs.append(job_info)
    
    # Create a DataFrame
    df = pd.DataFrame(jobs)
    
    # Data cleaning and transformation
    df['posting_date'] = pd.to_datetime(df['posting_date'])
    df['category'] = df['category'].str.lower()
    
    return df

def load_job_data(df):
    # Store the processed data in the database
    df.to_sql('job_postings', engine, if_exists='replace', index=False)

def etl_pipeline():
    # Fetch job data from LinkedIn API
    data = fetch_job_data()
    if data:
        # Transform the job data
        df = transform_job_data(data)
        # Load the transformed data into the database
        load_job_data(df)
    else:
        print('Failed to fetch job data')

if __name__ == '__main__':
    etl_pipeline()
