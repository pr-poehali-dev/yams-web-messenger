import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const Settings = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const [notifications, setNotifications] = useState(true);
  const [messagePreview, setMessagePreview] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  
  const [lastSeen, setLastSeen] = useState('everyone');
  const [profilePhoto, setProfilePhoto] = useState('everyone');
  const [readReceipts, setReadReceipts] = useState(true);
  const [autoDownload, setAutoDownload] = useState('wifi');
  
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState([16]);
  const [language, setLanguage] = useState('ru');
  
  const [autoDeleteMessages, setAutoDeleteMessages] = useState('never');
  const [cacheSize] = useState('1.2');

  const handleLogout = () => {
    localStorage.removeItem('yasms_user');
    navigate('/');
  };

  const settingsMenus = [
    { id: 'notifications', icon: 'Bell', title: 'Уведомления', subtitle: 'Звуки, вибрация, превью' },
    { id: 'privacy', icon: 'Lock', title: 'Конфиденциальность', subtitle: 'Последний визит, фото профиля' },
    { id: 'data', icon: 'Database', title: 'Данные и память', subtitle: 'Использование сети и хранилища' },
    { id: 'chats', icon: 'MessageSquare', title: 'Чаты', subtitle: 'Тема, обои, история' },
    { id: 'appearance', icon: 'Palette', title: 'Внешний вид', subtitle: 'Тема оформления' },
    { id: 'language', icon: 'Globe', title: 'Язык', subtitle: 'Русский' },
    { id: 'devices', icon: 'Smartphone', title: 'Устройства', subtitle: 'Активные сеансы' },
    { id: 'help', icon: 'HelpCircle', title: 'Помощь', subtitle: 'FAQ, поддержка, политика' },
  ];

  const renderMainSettings = () => (
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
            onClick={() => setSelectedSection(menu.id)}
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
        onClick={handleLogout}
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

  const renderNotifications = () => (
    <>
      <Button
        variant="ghost"
        onClick={() => setSelectedSection(null)}
        className="text-white hover:bg-[hsl(var(--messenger-card))] mb-4"
      >
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Назад
      </Button>

      <h2 className="text-2xl font-bold mb-6">Уведомления</h2>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl overflow-hidden divide-y divide-[hsl(var(--messenger-border))]">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-medium">Уведомления</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Включить все уведомления</p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-medium">Превью сообщений</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Показывать текст в уведомлениях</p>
          </div>
          <Switch checked={messagePreview} onCheckedChange={setMessagePreview} disabled={!notifications} />
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-medium">Звук</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Воспроизводить звук уведомлений</p>
          </div>
          <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} disabled={!notifications} />
        </div>

        <div className="p-4 flex items-center justify-between">
          <div>
            <h4 className="font-medium">Вибрация</h4>
            <p className="text-sm text-[hsl(var(--messenger-text-muted))]">Вибрировать при получении сообщений</p>
          </div>
          <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} disabled={!notifications} />
        </div>
      </div>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-4 mt-4">
        <h4 className="font-medium mb-3">Уведомления от</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Личные чаты</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Группы</span>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Каналы</span>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </>
  );

  const renderPrivacy = () => (
    <>
      <Button
        variant="ghost"
        onClick={() => setSelectedSection(null)}
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

  const renderDataMemory = () => (
    <>
      <Button
        variant="ghost"
        onClick={() => setSelectedSection(null)}
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

  const renderChats = () => (
    <>
      <Button
        variant="ghost"
        onClick={() => setSelectedSection(null)}
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

  const renderAppearance = () => (
    <>
      <Button
        variant="ghost"
        onClick={() => setSelectedSection(null)}
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

  const renderLanguage = () => (
    <>
      <Button
        variant="ghost"
        onClick={() => setSelectedSection(null)}
        className="text-white hover:bg-[hsl(var(--messenger-card))] mb-4"
      >
        <Icon name="ArrowLeft" size={20} className="mr-2" />
        Назад
      </Button>

      <h2 className="text-2xl font-bold mb-6">Язык</h2>

      <div className="bg-[hsl(var(--messenger-card))] rounded-2xl overflow-hidden">
        <RadioGroup value={language} onValueChange={setLanguage}>
          {[
            { value: 'ru', label: 'Русский', native: 'Русский' },
            { value: 'en', label: 'English', native: 'English' },
            { value: 'uk', label: 'Українська', native: 'Українська' },
            { value: 'de', label: 'Deutsch', native: 'Deutsch' },
            { value: 'es', label: 'Español', native: 'Español' },
            { value: 'fr', label: 'Français', native: 'Français' },
            { value: 'it', label: 'Italiano', native: 'Italiano' },
            { value: 'pt', label: 'Português', native: 'Português' },
          ].map((lang, index, arr) => (
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
            onClick={() => selectedSection ? setSelectedSection(null) : navigate('/chats')}
            className="md:hidden text-white mr-2"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-xl font-semibold">
            {selectedSection 
              ? settingsMenus.find(m => m.id === selectedSection)?.title 
              : 'Настройки'}
          </h1>
        </div>

        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4">
            {!selectedSection && renderMainSettings()}
            {selectedSection === 'notifications' && renderNotifications()}
            {selectedSection === 'privacy' && renderPrivacy()}
            {selectedSection === 'data' && renderDataMemory()}
            {selectedSection === 'chats' && renderChats()}
            {selectedSection === 'appearance' && renderAppearance()}
            {selectedSection === 'language' && renderLanguage()}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Settings;
