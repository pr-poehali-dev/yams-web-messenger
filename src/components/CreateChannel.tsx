import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CreateChannelProps {
  onClose: () => void;
  onCreate: (data: any) => void;
}

const CreateChannel = ({ onClose, onCreate }: CreateChannelProps) => {
  const [channelType, setChannelType] = useState<'channel' | 'group'>('channel');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const availableUsers = [
    { id: 2, name: 'Александр Иванов', username: '@alexander_dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander' },
    { id: 3, name: 'YaSMS Bot', username: '@yasms_official', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=YaSMS' },
    { id: 4, name: 'Мария Петрова', username: '@maria_design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria' },
  ];

  const handleCreate = () => {
    onCreate({
      type: channelType,
      title,
      description,
      username,
      isPrivate,
      members: selectedUsers,
    });
    onClose();
  };

  const toggleUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-[hsl(var(--messenger-dark-bg))] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        <div className="p-6 border-b border-[hsl(var(--messenger-border))] flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Создать</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-[hsl(var(--messenger-card))]">
            <Icon name="X" size={24} />
          </Button>
        </div>

        <Tabs value={channelType} onValueChange={(v) => setChannelType(v as 'channel' | 'group')} className="flex-1 flex flex-col">
          <TabsList className="w-full bg-[hsl(var(--messenger-darker-bg))] border-b border-[hsl(var(--messenger-border))] rounded-none">
            <TabsTrigger value="channel" className="flex-1 data-[state=active]:bg-[hsl(var(--messenger-card))] text-white">
              <Icon name="Radio" size={20} className="mr-2" />
              Канал
            </TabsTrigger>
            <TabsTrigger value="group" className="flex-1 data-[state=active]:bg-[hsl(var(--messenger-card))] text-white">
              <Icon name="Users" size={20} className="mr-2" />
              Группа
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 p-6">
            <TabsContent value="channel" className="mt-0 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0088CC] to-[#2AABEE] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <Icon name="Camera" size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[hsl(var(--messenger-text-muted))] mb-1">
                    Фото канала
                  </h3>
                  <p className="text-xs text-[hsl(var(--messenger-text-muted))]">
                    Нажмите, чтобы загрузить
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel-title" className="text-white">
                  Название канала
                </Label>
                <Input
                  id="channel-title"
                  placeholder="Мой канал"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel-username" className="text-white">
                  Публичная ссылка
                </Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[hsl(var(--messenger-border))] bg-[hsl(var(--messenger-darker-bg))] text-[hsl(var(--messenger-text-muted))] text-sm">
                    t.me/
                  </span>
                  <Input
                    id="channel-username"
                    placeholder="mychannel"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-l-none bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channel-description" className="text-white">
                  Описание
                </Label>
                <Textarea
                  id="channel-description"
                  placeholder="О чем ваш канал?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Тип канала</Label>
                <RadioGroup value={isPrivate ? 'private' : 'public'} onValueChange={(v) => setIsPrivate(v === 'private')}>
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-[hsl(var(--messenger-card))] border border-[hsl(var(--messenger-border))]">
                    <RadioGroupItem value="public" id="public" className="border-white text-[#0088CC]" />
                    <Label htmlFor="public" className="flex-1 cursor-pointer text-white">
                      <div className="font-medium">Публичный</div>
                      <div className="text-xs text-[hsl(var(--messenger-text-muted))]">
                        Любой может найти канал в поиске и присоединиться
                      </div>
                    </Label>
                    <Icon name="Globe" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg bg-[hsl(var(--messenger-card))] border border-[hsl(var(--messenger-border))]">
                    <RadioGroupItem value="private" id="private" className="border-white text-[#0088CC]" />
                    <Label htmlFor="private" className="flex-1 cursor-pointer text-white">
                      <div className="font-medium">Приватный</div>
                      <div className="text-xs text-[hsl(var(--messenger-text-muted))]">
                        Доступ только по ссылке-приглашению
                      </div>
                    </Label>
                    <Icon name="Lock" size={20} className="text-[hsl(var(--messenger-text-muted))]" />
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="group" className="mt-0 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0088CC] to-[#2AABEE] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
                  <Icon name="Camera" size={32} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[hsl(var(--messenger-text-muted))] mb-1">
                    Фото группы
                  </h3>
                  <p className="text-xs text-[hsl(var(--messenger-text-muted))]">
                    Нажмите, чтобы загрузить
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="group-title" className="text-white">
                  Название группы
                </Label>
                <Input
                  id="group-title"
                  placeholder="Моя группа"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="group-description" className="text-white">
                  Описание
                </Label>
                <Textarea
                  id="group-description"
                  placeholder="О чем ваша группа?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="bg-[hsl(var(--messenger-card))] border-[hsl(var(--messenger-border))] text-white resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Добавить участников ({selectedUsers.length})</Label>
                <div className="space-y-2">
                  {availableUsers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => toggleUser(user.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedUsers.includes(user.id)
                          ? 'bg-[#0088CC]/20 border-[#0088CC]'
                          : 'bg-[hsl(var(--messenger-card))] hover:bg-[hsl(var(--messenger-card))]/80'
                      } border border-[hsl(var(--messenger-border))]`}
                    >
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{user.name}</h4>
                        <p className="text-sm text-[hsl(var(--messenger-text-muted))]">{user.username}</p>
                      </div>
                      {selectedUsers.includes(user.id) && (
                        <Icon name="Check" size={20} className="text-[#0088CC]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="p-6 border-t border-[hsl(var(--messenger-border))] flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1 text-white hover:bg-[hsl(var(--messenger-card))]">
            Отмена
          </Button>
          <Button onClick={handleCreate} className="flex-1 bg-[#0088CC] hover:bg-[#2AABEE] text-white">
            {channelType === 'channel' ? 'Создать канал' : 'Создать группу'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;
