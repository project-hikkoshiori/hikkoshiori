from lib2to3.pytree import Base
from db import Base
from sqlalchemy import Column, String, ForeignKey
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
 
    def __str__(self):
        return str(self.id) + ':' + self.user_id

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
 
    table_id = Column('table_id', ForeignKey('housekeep_table.id'))
    name = Column('name', String(256))
    value = Column('value', INTEGER)
    is_prepared = Column('is_prepared', BOOLEAN, default=False, nullable=False)
 
    def __init__(self, table_id: int, name: str, value: int, is_prepared: bool):
        self.table_id = table_id
        self.name = name
        self.value = value
        self.is_prepared = False
 
    def __str__(self):
        return str(self.id) + \
               ': table_id -> ' + str(self.table_id) + \
               ', name -> ' + self.name + \
               ', value -> ' + str(self.value) + \
               ', is_prepared -> ' + str(self.is_prepared)