-- YaSMS WEB Messenger Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    status VARCHAR(50) DEFAULT 'offline',
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chats table (for direct messages, groups, channels)
CREATE TABLE IF NOT EXISTS chats (
    id SERIAL PRIMARY KEY,
    chat_type VARCHAR(20) NOT NULL CHECK (chat_type IN ('direct', 'group', 'channel', 'bot')),
    title VARCHAR(255),
    description TEXT,
    avatar_url TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat members (users in chats)
CREATE TABLE IF NOT EXISTS chat_members (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL REFERENCES chats(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(chat_id, user_id)
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL REFERENCES chats(id),
    sender_id INTEGER NOT NULL REFERENCES users(id),
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'voice', 'video', 'file', 'image')),
    content TEXT,
    file_url TEXT,
    text_color VARCHAR(20),
    bg_color VARCHAR(20),
    reply_to INTEGER REFERENCES messages(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);

-- Calls table (video/audio calls history)
CREATE TABLE IF NOT EXISTS calls (
    id SERIAL PRIMARY KEY,
    chat_id INTEGER NOT NULL REFERENCES chats(id),
    caller_id INTEGER NOT NULL REFERENCES users(id),
    call_type VARCHAR(10) NOT NULL CHECK (call_type IN ('audio', 'video')),
    status VARCHAR(20) DEFAULT 'calling' CHECK (status IN ('calling', 'active', 'ended', 'missed', 'declined')),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP,
    duration INTEGER DEFAULT 0
);

-- Contacts table (user contacts sync)
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    contact_user_id INTEGER NOT NULL REFERENCES users(id),
    contact_name VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, contact_user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_members_chat_id ON chat_members(chat_id);
CREATE INDEX IF NOT EXISTS idx_chat_members_user_id ON chat_members(user_id);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_calls_chat_id ON calls(chat_id);
CREATE INDEX IF NOT EXISTS idx_contacts_user_id ON contacts(user_id);

-- Insert demo data
INSERT INTO users (username, phone, display_name, avatar_url, bio, status) VALUES
('@your_username', '+79991234567', 'Вы', 'https://api.dicebear.com/7.x/avataaars/svg?seed=User', 'Мой статус', 'online'),
('@alexander_dev', '+79991234568', 'Александр Иванов', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander', 'Разработчик', 'online'),
('@yasms_official', '+79991234569', 'YaSMS Bot', 'https://api.dicebear.com/7.x/bottts/svg?seed=YaSMS', 'Официальный бот YaSMS WEB', 'online'),
('@maria_design', '+79991234570', 'Мария Петрова', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', 'UI/UX Дизайнер', 'offline')
ON CONFLICT (username) DO NOTHING;

-- Create direct chats
INSERT INTO chats (chat_type, created_by) VALUES
('direct', 1),
('direct', 1),
('direct', 1)
ON CONFLICT DO NOTHING;

-- Add chat members
INSERT INTO chat_members (chat_id, user_id, role) VALUES
(1, 1, 'member'),
(1, 2, 'member'),
(2, 1, 'member'),
(2, 3, 'member'),
(3, 1, 'member'),
(3, 4, 'member')
ON CONFLICT (chat_id, user_id) DO NOTHING;

-- Insert demo messages
INSERT INTO messages (chat_id, sender_id, message_type, content) VALUES
(1, 2, 'text', 'Привет! Как дела?'),
(1, 1, 'text', 'Отлично! Работаю над новым проектом'),
(1, 2, 'text', 'Как дела с проектом?'),
(2, 3, 'text', 'Добро пожаловать в YaSMS WEB!'),
(3, 4, 'text', 'Отправила тебе файлы 📎')
ON CONFLICT DO NOTHING;

-- Add contacts
INSERT INTO contacts (user_id, contact_user_id, contact_name) VALUES
(1, 2, 'Александр'),
(1, 3, 'YaSMS Bot'),
(1, 4, 'Мария')
ON CONFLICT (user_id, contact_user_id) DO NOTHING;