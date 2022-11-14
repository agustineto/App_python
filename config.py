
class Config:
    SECRET_KEY = 'python_flask5467'


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql://ctc_developers:DesarrollosCTC@107.180.100.184:3310/python-web'
    #SQLALCHEMY_DATABASE_URI = create_engine('C##DATAADAM/C##DATAADAM@107.180.100.184:1553/cdocqac')

config = {
    'development': DevelopmentConfig,
    'default': DevelopmentConfig
}    