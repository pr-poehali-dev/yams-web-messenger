import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface DataMemorySettingsProps {
  cacheSize: string;
  autoDownload: string;
  setAutoDownload: (value: string) => void;
  onBack: () => void;
}

const DataMemorySettings = ({
  cacheSize,
  autoDownload,
  setAutoDownload,
  onBack,
}: DataMemorySettingsProps) => {
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

      <h2 className="text-2xl font-bold mb-6">Данные и память</h2>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium">Использование памяти</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">{cacheSize} ГБ</p>
          </div>
          <Icon name="HardDrive" size={24} className="text-[#0088CC]" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[hsl(var(--messenger-text-muted))]">Сообщения</span>
            <span>450 МБ</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[hsl(var(--messenger-text-muted))]">Фото</span>
            <span>520 МБ</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[hsl(var(--messenger-text-muted))]">Видео</span>
            <span>280 МБ</span>
          </div>
        </div>

        <Button variant="outline" className="w-full mt-4 border-red-500 text-red-500 hover:bg-red-500/10">
          <Icon name="Trash2" size={18} className="mr-2" />
          Очистить кэш
        </Button>
      </div>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-4 space-y-4">
        <div>
          <Label className="text-white mb-2 block">Автозагрузка медиа</Label>
          <Select value={autoDownload} onValueChange={setAutoDownload}>
            <SelectTrigger className="bg-[hsl(var(--messenger-darker-bg))] border-[hsl(var(--messenger-border))] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))]">
              <SelectItem value="always">Всегда</SelectItem>
              <SelectItem value="wifi">Только по Wi-Fi</SelectItem>
              <SelectItem value="never">Никогда</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-[hsl(var(--messenger-text-muted))] mt-1">
            Когда автоматически загружать фото и видео
          </p>
        </div>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <div className="space-y-3">
          <h4 className="font-medium">Автозагрузка типов файлов</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm">Фото</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Видео</span>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Документы</span>
            <Switch />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataMemorySettings;
