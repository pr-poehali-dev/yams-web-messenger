import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Channel {
  id: number;
  title: string;
  username: string;
  avatar: string;
  description: string;
  members: number;
  isPrivate: boolean;
  unreadCount: number;
}

const Channels = () => {
  const navigate = useNavigate();

  const myChannels: Channel[] = [
    {
      id: 1,
      title: 'YaSMS Новости',
      username: '@yasms_news',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=news',
      description: 'Официальный канал новостей YaSMS',
      members: 15420,
      isPrivate: false,
      unreadCount: 5,
    },
    {
      id: 2,
      title: 'Tech Community',
      username: '@tech_comm',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=tech',
      description: 'Обсуждаем технологии и разработку',
      members: 8932,
      isPrivate: false,
      unreadCount: 12,
    },
  ];

  const recommendedChannels: Channel[] = [
    {
      id: 3,
      title: 'Design Tips',
      username: '@design_tips',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=design',
      description: 'Советы по дизайну каждый день',
      members: 23450,
      isPrivate: false,
      unreadCount: 0,
    },
    {
      id: 4,
      title: 'Code Academy',
      username: '@code_learn',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=code',
      description: 'Обучение программированию',
      members: 45120,
      isPrivate: false,
      unreadCount: 0,
    },
  ];

  const formatMembers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
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
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white"
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
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white bg-[hsl(var(--messenger-card))]"
        >
          <Icon name="Radio" size={24} />
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

        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-[hsl(var(--messenger-darker-bg))] border-b border-[hsl(var(--messenger-border))] flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/chats')}
              className="md:hidden text-white"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-xl font-semibold">Каналы</h1>
          </div>
          <Button className="bg-[#0088CC] hover:bg-[#2AABEE] text-white gap-2">
            <Icon name="Plus" size={18} />
            <span className="hidden md:inline">Создать канал</span>
          </Button>
        </div>

        <div className="p-4 md:p-6 border-b border-[hsl(var(--messenger-border))]">
          <div className="relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--messenger-text-muted))]"
            />
            <Input
              placeholder="Поиск каналов"
              className="pl-10 bg-[hsl(var(--messenger-card))] border-none text-white placeholder:text-[hsl(var(--messenger-text-muted))]"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 md:p-6">
          <div className="space-y-6 max-w-4xl">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="Star" size={20} className="text-[#0088CC]" />
                Мои каналы
              </h2>
              <div className="space-y-3">
                {myChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80 transition-all cursor-pointer"
                  >
                    <Avatar className="w-14 h-14 rounded-xl flex-shrink-0">
                      <AvatarImage src={channel.avatar} />
                      <AvatarFallback>{channel.title[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-base truncate">{channel.title}</h3>
                            {channel.isPrivate && (
                              <Icon name="Lock" size={14} className="text-[hsl(var(--messenger-text-muted))] flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-[hsl(var(--messenger-text-muted))] truncate">
                            {channel.username}
                          </p>
                        </div>
                        {channel.unreadCount > 0 && (
                          <Badge className="bg-[#0088CC] text-white flex-shrink-0">
                            {channel.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[hsl(var(--messenger-text-muted))] line-clamp-2 mb-2">
                        {channel.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[hsl(var(--messenger-text-muted))]">
                        <Icon name="Users" size={14} />
                        <span>{formatMembers(channel.members)} подписчиков</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={20} className="text-[#0088CC]" />
                Рекомендуемые
              </h2>
              <div className="space-y-3">
                {recommendedChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80 transition-all cursor-pointer"
                  >
                    <Avatar className="w-14 h-14 rounded-xl flex-shrink-0">
                      <AvatarImage src={channel.avatar} />
                      <AvatarFallback>{channel.title[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-base truncate mb-1">{channel.title}</h3>
                          <p className="text-sm text-[hsl(var(--messenger-text-muted))] truncate">
                            {channel.username}
                          </p>
                        </div>
                        <Button className="bg-[#0088CC] hover:bg-[#2AABEE] text-white h-8 px-4 flex-shrink-0">
                          Подписаться
                        </Button>
                      </div>
                      <p className="text-sm text-[hsl(var(--messenger-text-muted))] line-clamp-2 mb-2">
                        {channel.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-[hsl(var(--messenger-text-muted))]">
                        <Icon name="Users" size={14} />
                        <span>{formatMembers(channel.members)} подписчиков</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="fixed bottom-4 right-4 md:hidden">
        <Button
          className="w-14 h-14 rounded-full bg-[#0088CC] hover:bg-[#2AABEE] text-white shadow-lg"
          size="icon"
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Channels;
