import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import SettingsSidebar from '@/components/settings/SettingsSidebar';
import SettingsMainMenu from '@/components/settings/SettingsMainMenu';
import NotificationsSettings from '@/components/settings/NotificationsSettings';
import PrivacySettings from '@/components/settings/PrivacySettings';
import DataMemorySettings from '@/components/settings/DataMemorySettings';
import ChatsSettings from '@/components/settings/ChatsSettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import LanguageSettings from '@/components/settings/LanguageSettings';

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

  const renderContent = () => {
    if (!selectedSection) {
      return (
        <SettingsMainMenu
          settingsMenus={settingsMenus}
          onSelectSection={setSelectedSection}
          onLogout={handleLogout}
        />
      );
    }

    switch (selectedSection) {
      case 'notifications':
        return (
          <NotificationsSettings
            notifications={notifications}
            setNotifications={setNotifications}
            messagePreview={messagePreview}
            setMessagePreview={setMessagePreview}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            vibrationEnabled={vibrationEnabled}
            setVibrationEnabled={setVibrationEnabled}
            onBack={() => setSelectedSection(null)}
          />
        );
      case 'privacy':
        return (
          <PrivacySettings
            lastSeen={lastSeen}
            setLastSeen={setLastSeen}
            profilePhoto={profilePhoto}
            setProfilePhoto={setProfilePhoto}
            readReceipts={readReceipts}
            setReadReceipts={setReadReceipts}
            onBack={() => setSelectedSection(null)}
          />
        );
      case 'data':
        return (
          <DataMemorySettings
            cacheSize={cacheSize}
            autoDownload={autoDownload}
            setAutoDownload={setAutoDownload}
            onBack={() => setSelectedSection(null)}
          />
        );
      case 'chats':
        return (
          <ChatsSettings
            autoDeleteMessages={autoDeleteMessages}
            setAutoDeleteMessages={setAutoDeleteMessages}
            onBack={() => setSelectedSection(null)}
          />
        );
      case 'appearance':
        return (
          <AppearanceSettings
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
            onBack={() => setSelectedSection(null)}
          />
        );
      case 'language':
        return (
          <LanguageSettings
            language={language}
            setLanguage={setLanguage}
            onBack={() => setSelectedSection(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[hsl(var(--messenger-dark-bg))] text-white overflow-hidden">
      <SettingsSidebar />

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
            {renderContent()}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Settings;
