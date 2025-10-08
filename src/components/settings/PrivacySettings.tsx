import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface PrivacySettingsProps {
  lastSeen: string;
  setLastSeen: (value: string) => void;
  profilePhoto: string;
  setProfilePhoto: (value: string) => void;
  readReceipts: boolean;
  setReadReceipts: (value: boolean) => void;
  onBack: () => void;
}

const PrivacySettings = ({
  lastSeen,
  setLastSeen,
  profilePhoto,
  setProfilePhoto,
  readReceipts,
  setReadReceipts,
  onBack,
}: PrivacySettingsProps) => {
  return (
    <>
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-white hover:bg-[hsl(var(--messenger-card))] mb-4"
      >
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Назад
      </Button>

      <h2 className="text-2xl font-bold mb-6">Конфиденциальность</h2>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-4 space-y-4">
        <div>
          <Label className="text-white mb-2 block">Последний визит</Label>
          <Select value={lastSeen} onValueChange={setLastSeen}>
            <SelectTrigger className="bg-[hsl(var(--messenger-darker-bg))] border-[hsl(var(--messenger-border))] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))]">
              <SelectItem value="everyone">Все</SelectItem>
              <SelectItem value="contacts">Мои контакты</SelectItem>
              <SelectItem value="nobody">Никто</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-[hsl(var(--messenger-text-muted))] mt-1">
            Кто может видеть время последнего визита
          </p>
        </div>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <div>
          <Label className="text-white mb-2 block">Фото профиля</Label>
          <Select value={profilePhoto} onValueChange={setProfilePhoto}>
            <SelectTrigger className="bg-[hsl(var(--messenger-darker-bg))] border-[hsl(var(--messenger-border))] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))]">
              <SelectItem value="everyone">Все</SelectItem>
              <SelectItem value="contacts">Мои контакты</SelectItem>
              <SelectItem value="nobody">Никто</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-[hsl(var(--messenger-text-muted))] mt-1">
            Кто может видеть ваше фото профиля
          </p>
        </div>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Отметки о прочтении</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Отправлять статус прочтения</p>
          </div>
          <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
        </div>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
          <div className="flex items-center gap-3">
            <Icon name="Shield" size={20} className="text-[#0088CC]" />
            <div className="text-left">
              <h4 className="font-medium">Двухфакторная аутентификация</h4>
              <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Дополнительная защита</p>
            </div>
          </div>
          <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
        </button>

        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
          <div className="flex items-center gap-3">
            <Icon name="UserX" size={20} className="text-[#0088CC]" />
            <div className="text-left">
              <h4 className="font-medium">Заблокированные</h4>
              <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Список заблокированных пользователей</p>
            </div>
          </div>
          <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
        </button>
      </div>
    </>
  );
};

export default PrivacySettings;
