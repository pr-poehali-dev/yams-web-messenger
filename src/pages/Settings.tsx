import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('yasms_user');
    navigate('/');
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
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white"
        >
          <Icon name="Radio" size={24} />
        </Button>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/settings')}
          className="w-12 h-12 hover:bg-[hsl(var(--messenger-card))] text-white bg-[hsl(var(--messenger-card))]"
        >
          <Icon name="Settings" size={24} />
        </Button>

        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-16 bg-[hsl(var(--messenger-darker-bg))] border-b border-[hsl(var(--messenger-border))] flex items-center px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/chats')}
            className="md:hidden text-white mr-2"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-xl font-semibold">Настройки</h1>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
            <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">Ваш профиль</h2>
                  <p className="text-sm text-[hsl(var(--messenger-text-muted))]">@your_username</p>
                  <p className="text-sm text-[hsl(var(--messenger-text-muted))]">+7 (999) 999-99-99</p>
                </div>
                <Button variant="ghost" className="text-[#0088CC] hover:bg-[hsl(var(--messenger-darker-bg))]">
                  Изменить
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[hsl(var(--messenger-text-muted))] px-2">АККАУНТ</h3>
              
              <div className="bg-[hsl(var(--messenger-card))] rounded-2xl overflow-hidden">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="User" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">Имя пользователя</h4>
                    <p className="text-sm text-[hsl(var(--messenger-text-muted))]">@your_username</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                </button>

                <Separator className="bg-[hsl(var(--messenger-border))]" />

                <button className="w-full flex items-center gap-4 p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">Номер телефона</h4>
                    <p className="text-sm text-[hsl(var(--messenger-text-muted))]">+7 (999) 999-99-99</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                </button>

                <Separator className="bg-[hsl(var(--messenger-border))]" />

                <button className="w-full flex items-center gap-4 p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="MessageSquare" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">Статус</h4>
                    <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Привет, я использую YaSMS!</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[hsl(var(--messenger-text-muted))] px-2">УВЕДОМЛЕНИЯ</h3>
              
              <div className="bg-[hsl(var(--messenger-card))] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="Bell" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Уведомления</h4>
                    <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Включить звук и вибрацию</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator className="bg-[hsl(var(--messenger-border))]" />

                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="MessageSquare" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Превью сообщений</h4>
                    <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Показывать текст в уведомлениях</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[hsl(var(--messenger-text-muted))] px-2">КОНФИДЕНЦИАЛЬНОСТЬ</h3>
              
              <div className="bg-[hsl(var(--messenger-card))] rounded-2xl overflow-hidden">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="Lock" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">Приватность</h4>
                    <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Кто может видеть мой статус</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                </button>

                <Separator className="bg-[hsl(var(--messenger-border))]" />

                <button className="w-full flex items-center gap-4 p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="Shield" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">Безопасность</h4>
                    <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Двухфакторная аутентификация</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-[hsl(var(--messenger-text-muted))] px-2">ПРОЧЕЕ</h3>
              
              <div className="bg-[hsl(var(--messenger-card))] rounded-2xl overflow-hidden">
                <button className="w-full flex items-center gap-4 p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="HelpCircle" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">Помощь</h4>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                </button>

                <Separator className="bg-[hsl(var(--messenger-border))]" />

                <button className="w-full flex items-center gap-4 p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#0088CC]/20 flex items-center justify-center">
                    <Icon name="Info" size={20} className="text-[#0088CC]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium">О приложении</h4>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                </button>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full bg-transparent border-red-500 text-red-500 hover:bg-red-500/10"
            >
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти из аккаунта
            </Button>

            <div className="text-center text-sm text-[hsl(var(--messenger-text-muted))] py-4">
              YaSMS WEB v1.0.0
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Settings;
