import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface NotificationsSettingsProps {
  notifications: boolean;
  setNotifications: (value: boolean) => void;
  messagePreview: boolean;
  setMessagePreview: (value: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (value: boolean) => void;
  vibrationEnabled: boolean;
  setVibrationEnabled: (value: boolean) => void;
  onBack: () => void;
}

const NotificationsSettings = ({
  notifications,
  setNotifications,
  messagePreview,
  setMessagePreview,
  soundEnabled,
  setSoundEnabled,
  vibrationEnabled,
  setVibrationEnabled,
  onBack,
}: NotificationsSettingsProps) => {
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
};

export default NotificationsSettings;
