import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface SettingsMenuItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface SettingsMainMenuProps {
  settingsMenus: SettingsMenuItem[];
  onSelectSection: (sectionId: string) => void;
  onLogout: () => void;
}

const SettingsMainMenu = ({ settingsMenus, onSelectSection, onLogout }: SettingsMainMenuProps) => {
  return (
    <>
      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-6">
        <div className="flex items-center gap-4">
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
            <Icon name="Edit" size={20} />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {settingsMenus.map((menu) => (
          <button
            key={menu.id}
            onClick={() => onSelectSection(menu.id)}
            className="w-full bg-[hsl(var(--messenger-card))] rounded-2xl p-4 hover:bg-[hsl(var(--messenger-card))]/80 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0088CC]/20 flex items-center justify-center flex-shrink-0">
                <Icon name={menu.icon as any} size={24} className="text-[#0088CC]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-white">{menu.title}</h4>
                <p className="text-sm text-[hsl(var(--messenger-text-muted))] truncate">{menu.subtitle}</p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))] flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full bg-transparent border-red-500 text-red-500 hover:bg-red-500/10 h-12"
      >
        <Icon name="LogOut" size={20} className="mr-2" />
        Выйти из аккаунта
      </Button>

      <div className="text-center text-sm text-[hsl(var(--messenger-text-muted))] py-4">
        YaSMS WEB v1.0.0
      </div>
    </>
  );
};

export default SettingsMainMenu;
