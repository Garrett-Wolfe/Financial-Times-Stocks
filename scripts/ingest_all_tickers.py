import pandas as pd
from dotenv import dotenv_values
from pymongo import MongoClient
import argparse

config = dotenv_values("../server/.env")


client = MongoClient(config["ATLAS_URI"])
db = client[config["DB_NAME"]]
collection = db['tickers']


def ingest_csv(file_path):
    df = pd.read_csv(file_path)

    excluded_columns = ['Last Sale', 'Net Change', '% Change', 'Market Cap', 'Volume']
    df = df.drop(columns=excluded_columns)

    # Ensure all columns except IPO Year are strings
    df['Symbol'] = df['Symbol'].astype(str)
    df['Name'] = df['Name'].astype(str)
    df['Country'] = df['Country'].astype(str)
    df['Sector'] = df['Sector'].astype(str)
    df['Industry'] = df['Industry'].astype(str)
    df['IPO Year'] = pd.to_numeric(df['IPO Year'], errors='coerce').fillna(0).astype(int)

    # Insert each row into MongoDB
    for _, row in df.iterrows():
        stock_data = {
            "Symbol": row['Symbol'],
            "Name": row['Name'],
            "Country": row['Country'],
            "IPO Year": row['IPO Year'],
            "Sector": row['Sector'],
            "Industry": row['Industry']
        }
        collection.insert_one(stock_data)

    # Create indexes on Symbol and Name for efficient searching
    collection.create_index("Symbol")
    collection.create_index("Name")

    print(f"Data from {file_path} ingested successfully and indexes created.")


# Main function to handle command-line arguments
def main():
    parser = argparse.ArgumentParser(description="Ingest CSV to MongoDB and perform fuzzy search.")
    
    parser.add_argument('--file', type=str, help="Path to the CSV file to ingest", required=False)

    args = parser.parse_args()
    if args.file:
        ingest_csv(args.file)


# Entry point
if __name__ == "__main__":
    main()
