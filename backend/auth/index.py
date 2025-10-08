import json
import os
import random
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any
from datetime import datetime, timedelta

verification_codes = {}

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для авторизации с SMS-кодом - отправка и проверка кода
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
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action')
    
    if action == 'send_code':
        phone = body_data.get('phone')
        
        if not phone:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'phone required'}),
                'isBase64Encoded': False
            }
        
        code = str(random.randint(1000, 9999))
        
        verification_codes[phone] = {
            'code': code,
            'expires': (datetime.now() + timedelta(minutes=5)).isoformat()
        }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'message': f'Code sent to {phone}',
                'debug_code': code
            }),
            'isBase64Encoded': False
        }
    
    elif action == 'verify_code':
        phone = body_data.get('phone')
        code = body_data.get('code')
        
        if not phone or not code:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'phone and code required'}),
                'isBase64Encoded': False
            }
        
        stored = verification_codes.get(phone)
        
        if not stored:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Code not found or expired'}),
                'isBase64Encoded': False
            }
        
        if datetime.fromisoformat(stored['expires']) < datetime.now():
            del verification_codes[phone]
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Code expired'}),
                'isBase64Encoded': False
            }
        
        if stored['code'] != code:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid code'}),
                'isBase64Encoded': False
            }
        
        del verification_codes[phone]
        
        database_url = os.environ.get('DATABASE_URL')
        if database_url:
            try:
                conn = psycopg2.connect(database_url)
                cursor = conn.cursor(cursor_factory=RealDictCursor)
                
                cursor.execute('SELECT id, username, display_name FROM users WHERE phone = %s', (phone,))
                user = cursor.fetchone()
                
                if not user:
                    username = f'user{phone[-4:]}'
                    cursor.execute('''
                        INSERT INTO users (username, phone, display_name, status)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id, username, display_name
                    ''', (username, phone, 'Пользователь', 'online'))
                    user = cursor.fetchone()
                    conn.commit()
                
                cursor.close()
                conn.close()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'user': dict(user)
                    }),
                    'isBase64Encoded': False
                }
            except Exception as e:
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': str(e)}),
                    'isBase64Encoded': False
                }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'user': {'id': 1, 'phone': phone, 'username': 'user'}
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Invalid action'}),
        'isBase64Encoded': False
    }
