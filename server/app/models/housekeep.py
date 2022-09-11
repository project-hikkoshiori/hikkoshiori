from lib2to3.pytree import Base
from db import Base
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.mysql import INTEGER, BOOLEAN

class Housekeeps(Base):
    """
    Housekeeps

    id      : 主キー
    user_id : 外部キー

    """

    __tablename__ = 'housekeeps'
    id = Column('id',
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True,
    )
    user_id = Column('user_id', ForeignKey('users.id'))

 
    def __init__(self, user_id):
        self.user_id = user_id
 
    # def __str__(self):
    #     return str(self.id) + ':' + self.user_id

class Housekeep_tables(Base):
    """
    それぞれのHousekeepのテーブル
 
    id            : 主キー
    housekeep_id  : 外部キー
    name          : 家計簿の名前

    """
    __tablename__ = 'housekeep_table'
    id = Column(
        'id',
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True,
    )
 
    housekeep_id = Column('housekeep_id', ForeignKey('housekeeps.id'))
    name = Column('name', String(256))
 
    def __init__(self, housekeep_id: int, name: str):
        self.housekeep_id = housekeep_id
        self.name = name

    def __str__(self):
        return str(self.id) + \
               ': housekeep_id -> ' + str(self.housekeep_id) + \
               ', name -> ' + self.name

class Housekeep_columns(Base):
    """
    Housekeepのコラム
 
    id           : 主キー
    table_id     : 外部キー
    name         : コラムの名前
    value        : 値段
    is_prepared  : 準備出来たかどうかのチェックボックス

    """
    __tablename__ = 'housekeep_columns'
    id = Column(
        'id',
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True,
    )
 
    user_id = Column('user_id', ForeignKey('user.id'))
    content = Column('content', String(256))
    deadline = Column(
        'deadline',
        DateTime,
        default=None,
        nullable=False,
    )
    date = Column(
        'date',
        DateTime,
        default=datetime.now(),
        nullable=False,
        server_default=current_timestamp(),
    )
    done = Column('done', BOOLEAN, default=False, nullable=False)
 
    def __init__(self, user_id: int, content: str, deadline: datetime, date: datetime = datetime.now()):
        self.user_id = user_id
        self.content = content
        self.deadline = deadline
        self.date = date
        self.done = False
 
    def __str__(self):
        return str(self.id) + \
               ': user_id -> ' + str(self.user_id) + \
               ', content -> ' + self.content + \
               ', deadline -> ' + self.deadline.strftime('%Y/%m/%d - %H:%M:%S') + \
               ', date -> ' + self.date.strftime('%Y/%m/%d - %H:%M:%S') + \
               ', done -> ' + str(self.done)