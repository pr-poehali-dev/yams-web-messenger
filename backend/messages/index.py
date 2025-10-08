import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для работы с сообщениями - получение и отправка
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
            chat_id = params.get('chat_id')
            
            if not chat_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'chat_id required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute('''
                SELECT 
                    m.id, m.content, m.message_type, m.text_color, m.bg_color,
                    m.created_at, m.is_read, m.file_url,
                    u.id as sender_id, u.display_name as sender_name, u.avatar_url as sender_avatar
                FROM messages m
                JOIN users u ON m.sender_id = u.id
                WHERE m.chat_id = %s
                ORDER BY m.created_at ASC
                LIMIT 100
            ''', (chat_id,))
            
            messages = cursor.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(row) for row in messages], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            chat_id = body_data.get('chat_id')
            sender_id = body_data.get('sender_id')
            content = body_data.get('content')
            message_type = body_data.get('message_type', 'text')
            text_color = body_data.get('text_color')
            bg_color = body_data.get('bg_color')
            
            if not all([chat_id, sender_id, content]):
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'chat_id, sender_id, content required'}),
                    'isBase64Encoded': False
                }
            
            cursor.execute('''
                INSERT INTO messages (chat_id, sender_id, content, message_type, text_color, bg_color)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id, created_at
            ''', (chat_id, sender_id, content, message_type, text_color, bg_color))
            
            result = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'id': result['id'],
                    'created_at': str(result['created_at']),
                    'message': 'Message sent'
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
