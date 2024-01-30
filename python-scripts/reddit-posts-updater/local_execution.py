from dotenv import load_dotenv
from lambda_function import *


if __name__ == "__main__":
    load_dotenv()
    lambda_handler(None, None)
