import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface ChatsSettingsProps {
  autoDeleteMessages: string;
  setAutoDeleteMessages: (value: string) => void;
  onBack: () => void;
}

const ChatsSettings = ({
  autoDeleteMessages,
  setAutoDeleteMessages,
  onBack,
}: ChatsSettingsProps) => {
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

      <h2 className="text-2xl font-bold mb-6">Чаты</h2>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-4 space-y-4">
        <div>
          <Label className="text-white mb-2 block">Автоудаление сообщений</Label>
          <Select value={autoDeleteMessages} onValueChange={setAutoDeleteMessages}>
            <SelectTrigger className="bg-[hsl(var(--messenger-darker-bg))] border-[hsl(var(--messenger-border))] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))]">
              <SelectItem value="never">Никогда</SelectItem>
              <SelectItem value="1day">Через 1 день</SelectItem>
              <SelectItem value="7days">Через 7 дней</SelectItem>
              <SelectItem value="30days">Через 30 дней</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-[hsl(var(--messenger-text-muted))] mt-1">
            Автоматически удалять старые сообщения
          </p>
        </div>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
          <div className="flex items-center gap-3">
            <Icon name="Image" size={20} className="text-[#0088CC]" />
            <div className="text-left">
              <h4 className="font-medium">Фон чатов</h4>
              <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Изменить обои чатов</p>
            </div>
          </div>
          <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
        </button>

        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
          <div className="flex items-center gap-3">
            <Icon name="Archive" size={20} className="text-[#0088CC]" />
            <div className="text-left">
              <h4 className="font-medium">Архивные чаты</h4>
              <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Просмотр архива</p>
            </div>
          </div>
          <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
        </button>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Отправка по Enter</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Отправлять сообщение клавишей Enter</p>
          </div>
          <Switch defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Групповать медиа</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Объединять фото и видео в альбомы</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>

      <Button variant="outline" className="w-full mt-4 border-red-500 text-red-500 hover:bg-red-500/10">
        <Icon name="Trash2" size={18} className="mr-2" />
        Очистить всю историю
      </Button>
    </>
  );
};

export default ChatsSettings;
