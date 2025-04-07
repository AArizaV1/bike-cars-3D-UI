from app import app

def handler(event, context):
    with app.request_context(environ=event['headers']):
        return app.wsgi_app(event['headers'], lambda s, h: None)