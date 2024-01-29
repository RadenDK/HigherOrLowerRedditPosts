import os
from decimal import Decimal

import boto3
import praw


def lambda_handler(event, context):
    reddit_accessor = RedditAccessor()

    reddit_posts = reddit_accessor.retrieve_todays_reddit_posts()

    dynamodb_accessor = DynamoDBAccessor()

    dynamodb_accessor.delete_all_items()

    for post in reddit_posts:
        dynamodb_accessor.put_item_into_db(post)


class RedditAccessor():
    def __init__(self):
        client_id = os.getenv("MY_REDDIT_CLIENT_ID")
        client_secret = os.getenv("MY_REDDIT_CLIENT_SECRET")
        user_agent = os.getenv("MY_REDDIT_USER_AGENT")

        self.reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent
        )

    def retrieve_todays_reddit_posts(self):
        todays_reddit_posts = []

        for submission in self.reddit.subreddit("AmItheAsshole").top(time_filter="day", limit=10):
            redditpost = {
                "title": submission.title,
                "user": submission.author.name,
                "created_utc": Decimal(str(submission.created_utc)),
                "score": submission.score
            }

            todays_reddit_posts.append(redditpost)

        return todays_reddit_posts


class DynamoDBAccessor():

    def __init__(self):
        aws_access_key_id = os.getenv("MY_AWS_ACCESS_KEY_ID")
        aws_secret_access_key = os.getenv("MY_AWS_SECRET_ACCESS_KEY")

        self.dynamodb = boto3.resource('dynamodb', aws_access_key_id=aws_access_key_id,
                                       aws_secret_access_key=aws_secret_access_key)

        table_name = 'topRedditPosts'

        self.table = self.dynamodb.Table(table_name)

    def put_item_into_db(self, item):
        self.table.put_item(Item=item)

    def delete_all_items(self):
        response = self.table.scan()
        for item in response.get('Items', []):
            self.table.delete_item(
                Key={
                    'title': item['title']
                }
            )
