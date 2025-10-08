import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Call {
  id: number;
  contact: {
    name: string;
    avatar: string;
  };
  type: 'video' | 'audio';
  status: 'incoming' | 'outgoing' | 'missed';
  time: string;
  duration?: string;
}

const Calls = () => {
  const navigate = useNavigate();

  const recentCalls: Call[] = [
    {
      id: 1,
      contact: {
        name: 'Александр Иванов',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander',
      },
      type: 'video',
      status: 'outgoing',
      time: 'Сегодня, 15:30',
      duration: '12:34',
    },
    {
      id: 2,
      contact: {
        name: 'Мария Петрова',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      },
      type: 'audio',
      status: 'incoming',
      time: 'Сегодня, 12:15',
      duration: '5:22',
    },
    {
      id: 3,
      contact: {
        name: 'YaSMS Bot',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=YaSMS',
      },
      type: 'video',
      status: 'missed',
      time: 'Вчера, 18:45',
    },
  ];

  const getCallIcon = (call: Call) => {
    if (call.status === 'missed') return <Icon name="PhoneMissed" size={18} className="text-red-500" />;
    if (call.status === 'incoming') return <Icon name="PhoneIncoming" size={18} className="text-green-500" />;
    return <Icon name="PhoneOutgoing" size={18} className="text-[hsl(var(--messenger-text-muted))]" />;
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
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white bg-[hsl(var(--messenger-card))]"
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
            <h1 className="text-xl font-semibold">Звонки</h1>
          </div>
          <Button className="bg-[#0088CC] hover:bg-[#2AABEE] text-white gap-2">
            <Icon name="Plus" size={18} />
            <span className="hidden md:inline">Новый звонок</span>
          </Button>
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <TabsList className="w-full bg-[hsl(var(--messenger-darker-bg))] border-b border-[hsl(var(--messenger-border))] rounded-none justify-start px-4 md:px-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-[hsl(var(--messenger-card))] text-white">
              Все
            </TabsTrigger>
            <TabsTrigger value="missed" className="data-[state=active]:bg-[hsl(var(--messenger-card))] text-white">
              Пропущенные
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1">
            <TabsContent value="all" className="mt-0 p-4 md:p-6 space-y-2">
              {recentCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center gap-4 p-3 md:p-4 rounded-xl bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80 transition-all cursor-pointer"
                >
                  <Avatar className="w-12 h-12 md:w-14 md:h-14">
                    <AvatarImage src={call.contact.avatar} />
                    <AvatarFallback>{call.contact.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm md:text-base truncate">{call.contact.name}</h3>
                      {getCallIcon(call)}
                    </div>
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[hsl(var(--messenger-text-muted))]">
                      <span>{call.time}</span>
                      {call.duration && (
                        <>
                          <span>•</span>
                          <span>{call.duration}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 hover:bg-[hsl(var(--messenger-darker-bg))] text-white"
                    >
                      <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="missed" className="mt-0 p-4 md:p-6 space-y-2">
              {recentCalls
                .filter((call) => call.status === 'missed')
                .map((call) => (
                  <div
                    key={call.id}
                    className="flex items-center gap-4 p-3 md:p-4 rounded-xl bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80 transition-all cursor-pointer"
                  >
                    <Avatar className="w-12 h-12 md:w-14 md:h-14">
                      <AvatarImage src={call.contact.avatar} />
                      <AvatarFallback>{call.contact.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm md:text-base text-red-500 truncate">{call.contact.name}</h3>
                        {getCallIcon(call)}
                      </div>
                      <p className="text-xs md:text-sm text-[hsl(var(--messenger-text-muted))]">{call.time}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 hover:bg-[hsl(var(--messenger-darker-bg))] text-white"
                    >
                      <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={18} />
                    </Button>
                  </div>
                ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
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

export default Calls;
