import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const SettingsSidebar = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default SettingsSidebar;
