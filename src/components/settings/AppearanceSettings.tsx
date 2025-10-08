import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface AppearanceSettingsProps {
  theme: string;
  setTheme: (value: string) => void;
  fontSize: number[];
  setFontSize: (value: number[]) => void;
  onBack: () => void;
}

const AppearanceSettings = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  onBack,
}: AppearanceSettingsProps) => {
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

      <h2 className="text-2xl font-bold mb-6">Внешний вид</h2>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-4 space-y-4">
        <div>
          <Label className="text-white mb-3 block">Тема оформления</Label>
          <RadioGroup value={theme} onValueChange={setTheme}>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--messenger-border))] hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                <div className="flex items-center gap-3">
                  <Icon name="Sun" size={20} className="text-yellow-500" />
                  <Label htmlFor="light" className="cursor-pointer">Светлая</Label>
                </div>
                <RadioGroupItem value="light" id="light" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--messenger-border))] hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors bg-[hsl(var(--messenger-darker-bg))]">
                <div className="flex items-center gap-3">
                  <Icon name="Moon" size={20} className="text-blue-400" />
                  <Label htmlFor="dark" className="cursor-pointer">Темная</Label>
                </div>
                <RadioGroupItem value="dark" id="dark" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-[hsl(var(--messenger-border))] hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                <div className="flex items-center gap-3">
                  <Icon name="Laptop" size={20} className="text-gray-400" />
                  <Label htmlFor="system" className="cursor-pointer">Системная</Label>
                </div>
                <RadioGroupItem value="system" id="system" />
              </div>
            </div>
          </RadioGroup>
        </div>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <Label className="text-white">Размер шрифта</Label>
            <span className="text-sm text-[hsl(var(--messenger-text-muted))]">{fontSize[0]}px</span>
          </div>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            min={12}
            max={20}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-[hsl(var(--messenger-text-muted))]">
            <span>Маленький</span>
            <span>Большой</span>
          </div>
        </div>

        <Separator className="bg-[hsl(var(--messenger-border))]" />

        <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
          <div className="flex items-center gap-3">
            <Icon name="Palette" size={20} className="text-[#0088CC]" />
            <div className="text-left">
              <h4 className="font-medium">Цвет акцента</h4>
              <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Синий</p>
            </div>
          </div>
          <Icon name="ChevronRight" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Анимации</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Включить плавные переходы</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </>
  );
};

export default AppearanceSettings;
