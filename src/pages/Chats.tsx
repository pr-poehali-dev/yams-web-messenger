import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import VideoCall from '@/components/VideoCall';
import CreateChannel from '@/components/CreateChannel';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  time: string;
  color?: string;
  bgColor?: string;
}

interface Chat {
  id: number;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const Chats = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('transparent');
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [activeCall, setActiveCall] = useState<{ contact: any; type: 'video' | 'audio' } | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('yasms_user');
    if (!user) {
      navigate('/');
    }
    loadChats();
  }, [navigate]);

  const loadChats = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/d7ad23c6-d630-4ac3-8afd-db3a23af6d7f?user_id=1');
      const data = await response.json();
      
      const formattedChats = data.map((chat: any) => ({
        id: chat.id,
        name: chat.other_user_name || chat.title || 'Неизвестно',
        username: chat.other_user_username || '',
        avatar: chat.other_user_avatar || chat.avatar_url || '',
        lastMessage: chat.last_message || '',
        time: chat.last_message_time ? new Date(chat.last_message_time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : '',
        unread: chat.unread_count || 0,
        online: chat.other_user_status === 'online',
      }));
      
      setChats(formattedChats);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading chats:', error);
      setIsLoading(false);
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Как дела?',
      sender: 'other',
      time: '15:28',
    },
    {
      id: 2,
      text: 'Отлично! Работаю над новым проектом',
      sender: 'me',
      time: '15:29',
      color: '#0088CC',
    },
    {
      id: 3,
      text: 'Как дела с проектом?',
      sender: 'other',
      time: '15:30',
    },
  ]);

  const currentChat = chats.find((c) => c.id === selectedChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: 'me',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          color: textColor !== '#FFFFFF' ? textColor : undefined,
          bgColor: bgColor !== 'transparent' ? bgColor : undefined,
        },
      ]);
      setMessage('');
    }
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    setIsMobileChatOpen(true);
  };

  return (
    <div className="flex h-screen bg-[hsl(var(--messenger-dark-bg))] text-white overflow-hidden">
      <div className="hidden md:flex w-20 bg-[hsl(var(--messenger-darker-bg))] flex-col items-center py-4 space-y-6 border-r border-[hsl(var(--messenger-border))]">
        <div className="mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0088CC] to-[#2AABEE] flex items-center justify-center font-bold text-lg">
            YS
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/chats')}
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white bg-[hsl(var(--messenger-card))]"
        >
          <Icon name="MessageSquare" size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/calls')}
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white"
        >
          <Icon name="Phone" size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/channels')}
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white"
        >
          <Icon name="Radio" size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowCreateChannel(true)}
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white"
        >
          <Icon name="Plus" size={24} />
        </Button>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white"
        >
          <Icon name="Settings" size={24} />
        </Button>

        <Avatar className="w-12 h-12 cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </div>

      <div className={`w-full md:w-80 bg-[hsl(var(--messenger-darker-bg))] flex flex-col border-r border-[hsl(var(--messenger-border))] ${isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h1 className="text-xl font-bold">YaSMS</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <Icon name="Menu" size={24} />
            </Button>
          </div>

          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--messenger-text-muted))]"
            />
            <Input
              placeholder="Поиск"
              className="pl-10 bg-[hsl(var(--messenger-card))] border-none text-white placeholder:text-[hsl(var(--messenger-text-muted))]"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={`flex items-center gap-3 p-3 mx-2 rounded-lg cursor-pointer transition-all hover:bg-[hsl(var(--messenger-card))] ${
                selectedChat === chat.id ? 'bg-[hsl(var(--messenger-card))]' : ''
              }`}
            >
              <div className="relative flex-shrink-0">
                <Avatar>
                  <AvatarImage src={chat.avatar} />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[hsl(var(--messenger-darker-bg))]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-sm truncate">{chat.name}</h3>
                  <span className="text-xs text-[hsl(var(--messenger-text-muted))] flex-shrink-0 ml-2">{chat.time}</span>
                </div>
                <p className="text-sm text-[hsl(var(--messenger-text-muted))] truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#0088CC] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className={`flex-1 flex flex-col ${!isMobileChatOpen ? 'hidden md:flex' : 'flex'}`}>
        {currentChat && (
          <>
            <div className="h-16 bg-[hsl(var(--messenger-darker-bg))] border-b border-[hsl(var(--messenger-border))] flex items-center justify-between px-4 md:px-6">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileChatOpen(false)}
                  className="md:hidden text-white"
                >
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <Avatar className="w-10 h-10">
                  <AvatarImage src={currentChat.avatar} />
                  <AvatarFallback>{currentChat.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-sm md:text-base">{currentChat.name}</h2>
                  <p className="text-xs text-[hsl(var(--messenger-text-muted))]">
                    {currentChat.online ? 'онлайн' : 'был(а) недавно'}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 md:gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-[hsl(var(--messenger-card))] w-10 h-10"
                  onClick={() => setActiveCall({ contact: currentChat, type: 'audio' })}
                >
                  <Icon name="Phone" size={18} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-[hsl(var(--messenger-card))] w-10 h-10"
                  onClick={() => setActiveCall({ contact: currentChat, type: 'video' })}
                >
                  <Icon name="Video" size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-[hsl(var(--messenger-card))] w-10 h-10">
                  <Icon name="MoreVertical" size={18} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4 md:p-6">
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-md px-3 md:px-4 py-2 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-[#0088CC] text-white rounded-br-sm'
                          : 'bg-[hsl(var(--messenger-card))] text-white rounded-bl-sm'
                      }`}
                      style={{
                        backgroundColor: msg.bgColor !== 'transparent' && msg.bgColor ? msg.bgColor : undefined,
                        color: msg.color || undefined,
                      }}
                    >
                      <p className="break-words text-sm md:text-base">{msg.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-3 md:p-4 bg-[hsl(var(--messenger-darker-bg))] border-t border-[hsl(var(--messenger-border))]">
              <div className="flex items-center gap-1 md:gap-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-[hsl(var(--messenger-card))] w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
                  <Icon name="Paperclip" size={18} />
                </Button>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-[hsl(var(--messenger-card))] w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
                      <Icon name="Palette" size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))]">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-[hsl(var(--messenger-text-muted))] mb-1 block">
                          Цвет текста
                        </label>
                        <div className="flex gap-2">
                          {['#FFFFFF', '#0088CC', '#2AABEE', '#FF6B6B', '#4ECDC4', '#FFD93D'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setTextColor(color)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                textColor === color ? 'border-white' : 'border-transparent'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[hsl(var(--messenger-text-muted))] mb-1 block">Фон текста</label>
                        <div className="flex gap-2">
                          {['transparent', '#1C1CE5', '#7E69AB', '#9b87f5', '#FF6B6B', '#4ECDC4'].map((color) => (
                            <button
                              key={color}
                              onClick={() => setBgColor(color)}
                              className={`w-8 h-8 rounded-full border-2 ${
                                bgColor === color ? 'border-white' : 'border-transparent'
                              }`}
                              style={{
                                backgroundColor: color,
                                border: color === 'transparent' ? '2px dashed #666' : undefined,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Input
                  placeholder="Написать сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-[hsl(var(--messenger-card))] border-none text-white placeholder:text-[hsl(var(--messenger-text-muted))] text-sm md:text-base"
                />

                <Button variant="ghost" size="icon" className="hidden md:flex text-white hover:bg-[hsl(var(--messenger-card))] w-10 h-10 flex-shrink-0">
                  <Icon name="Smile" size={18} />
                </Button>

                <Button variant="ghost" size="icon" className="text-white hover:bg-[hsl(var(--messenger-card))] w-9 h-9 md:w-10 md:h-10 flex-shrink-0">
                  <Icon name="Mic" size={18} />
                </Button>

                <Button
                  onClick={handleSendMessage}
                  className="bg-[#0088CC] hover:bg-[#2AABEE] text-white w-9 h-9 md:w-10 md:h-10 flex-shrink-0"
                  size="icon"
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {showProfile && (
        <div className="absolute md:relative w-full md:w-80 h-full bg-[hsl(var(--messenger-darker-bg))] border-l border-[hsl(var(--messenger-border))] p-6 animate-fade-in z-40">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Профиль</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowProfile(false)}
              className="text-white hover:bg-[hsl(var(--messenger-card))]"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">Вы</h3>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">@your_username</p>
          </div>

          <Separator className="bg-[hsl(var(--messenger-border))] my-4" />

          <div className="space-y-4">
            <div>
              <label className="text-xs text-[hsl(var(--messenger-text-muted))] mb-2 block">Имя пользователя</label>
              <Input
                placeholder="@username"
                className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white"
              />
            </div>

            <div>
              <label className="text-xs text-[hsl(var(--messenger-text-muted))] mb-2 block">О себе</label>
              <Input
                placeholder="Статус..."
                className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white"
              />
            </div>

            <div>
              <label className="text-xs text-[hsl(var(--messenger-text-muted))] mb-2 block">Телефон</label>
              <Input
                placeholder="+7 (999) 999-99-99"
                className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white"
              />
            </div>
          </div>

          <Button className="w-full mt-6 bg-[#0088CC] hover:bg-[#2AABEE] text-white">Сохранить</Button>
        </div>
      )}

      {activeCall && (
        <VideoCall
          contact={{
            name: activeCall.contact.name,
            avatar: activeCall.contact.avatar,
          }}
          callType={activeCall.type}
          onEndCall={() => setActiveCall(null)}
        />
      )}

      {showCreateChannel && (
        <CreateChannel
          onClose={() => setShowCreateChannel(false)}
          onCreate={async (data) => {
            try {
              const response = await fetch('https://functions.poehali.dev/d7ad23c6-d630-4ac3-8afd-db3a23af6d7f', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
              });
              if (response.ok) {
                loadChats();
              }
            } catch (error) {
              console.error('Error creating chat:', error);
            }
          }}
        />
      )}
    </div>
  );
};

export default Chats;
