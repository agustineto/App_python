from app import create_app 
from config import config

config_class = config['development']
application = create_app(config_class)

if __name__ == '__main__':
    application.run()