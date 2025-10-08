import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с чатами - список чатов пользователя и создание новых
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'DATABASE_URL not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            user_id = params.get('user_id', '1')
            
            cursor.execute('''
                SELECT 
                    c.id, c.chat_type, c.title, c.description, c.avatar_url,
                    (
                        SELECT u.display_name 
                        FROM chat_members cm2 
                        JOIN users u ON cm2.user_id = u.id 
                        WHERE cm2.chat_id = c.id AND cm2.user_id != %s 
                        LIMIT 1
                    ) as other_user_name,
                    (
                        SELECT u.username 
                        FROM chat_members cm2 
                        JOIN users u ON cm2.user_id = u.id 
                        WHERE cm2.chat_id = c.id AND cm2.user_id != %s 
                        LIMIT 1
                    ) as other_user_username,
                    (
                        SELECT u.avatar_url 
                        FROM chat_members cm2 
                        JOIN users u ON cm2.user_id = u.id 
                        WHERE cm2.chat_id = c.id AND cm2.user_id != %s 
                        LIMIT 1
                    ) as other_user_avatar,
                    (
                        SELECT u.status 
                        FROM chat_members cm2 
                        JOIN users u ON cm2.user_id = u.id 
                        WHERE cm2.chat_id = c.id AND cm2.user_id != %s 
                        LIMIT 1
                    ) as other_user_status,
                    (
                        SELECT m.content 
                        FROM messages m 
                        WHERE m.chat_id = c.id 
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message,
                    (
                        SELECT m.created_at 
                        FROM messages m 
                        WHERE m.chat_id = c.id 
                        ORDER BY m.created_at DESC 
                        LIMIT 1
                    ) as last_message_time,
                    (
                        SELECT COUNT(*) 
                        FROM messages m 
                        WHERE m.chat_id = c.id AND m.sender_id != %s AND m.is_read = false
                    ) as unread_count
                FROM chats c
                JOIN chat_members cm ON c.id = cm.chat_id
                WHERE cm.user_id = %s
                ORDER BY last_message_time DESC NULLS LAST
            ''', (user_id, user_id, user_id, user_id, user_id, user_id))
            
            chats = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(row) for row in chats], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            chat_type = body_data.get('type', 'group')
            title = body_data.get('title')
            description = body_data.get('description')
            created_by = body_data.get('created_by', 1)
            members = body_data.get('members', [])
            
            if not title:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'title required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute('''
                INSERT INTO chats (chat_type, title, description, created_by)
                VALUES (%s, %s, %s, %s)
                RETURNING id
            ''', (chat_type, title, description, created_by))
            
            result = cursor.fetchone()
            chat_id = result['id']
            
            cursor.execute('''
                INSERT INTO chat_members (chat_id, user_id, role)
                VALUES (%s, %s, %s)
            ''', (chat_id, created_by, 'owner'))
            
            for member_id in members:
                cursor.execute('''
                    INSERT INTO chat_members (chat_id, user_id, role)
                    VALUES (%s, %s, %s)
                ''', (chat_id, member_id, 'member'))
            
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': chat_id,
                    'message': 'Chat created'
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()
