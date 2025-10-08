import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface LanguageSettingsProps {
  language: string;
  setLanguage: (value: string) => void;
  onBack: () => void;
}

const LanguageSettings = ({
  language,
  setLanguage,
  onBack,
}: LanguageSettingsProps) => {
  const languages = [
    { value: 'ru', label: 'Русский', native: 'Русский' },
    { value: 'en', label: 'English', native: 'English' },
    { value: 'uk', label: 'Українська', native: 'Українська' },
    { value: 'de', label: 'Deutsch', native: 'Deutsch' },
    { value: 'es', label: 'Español', native: 'Español' },
    { value: 'fr', label: 'Français', native: 'Français' },
    { value: 'it', label: 'Italiano', native: 'Italiano' },
    { value: 'pt', label: 'Português', native: 'Português' },
  ];

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

      <h2 className="text-2xl font-bold mb-6">Язык</h2>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl overflow-hidden">
        <RadioGroup value={language} onValueChange={setLanguage}>
          {languages.map((lang, index, arr) => (
            <div key={lang.value}>
              <div className="flex items-center justify-between p-4 hover:bg-[hsl(var(--messenger-darker-bg))] transition-colors">
                <Label htmlFor={lang.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{lang.label}</div>
                  <div className="text-sm text-[hsl(var(--messenger-text-muted))]">{lang.native}</div>
                </Label>
                <RadioGroupItem value={lang.value} id={lang.value} />
              </div>
              {index < arr.length - 1 && <Separator className="bg-[hsl(var(--messenger-border))]" />}
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-4 p-4 bg-[hsl(var(--messenger-card))]/50 rounded-xl border border-[hsl(var(--messenger-border))]">
        <div className="flex gap-3">
          <Icon name="Info" size={20} className="text-[#0088CC] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-[hsl(var(--messenger-text-muted))]">
            Изменение языка применится после перезапуска приложения
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSettings;
