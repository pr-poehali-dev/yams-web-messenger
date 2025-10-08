import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

const EmojiPicker = ({ onSelect }: EmojiPickerProps) => {
  const emojiCategories = {
    smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺'],
    gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏'],
    hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌'],
    food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧈', '🥐', '🥖', '🥨', '🥯', '🧇', '🥞', '🍳', '🥓', '🥩', '🍗', '🍖', '🦴', '🌮', '🌯', '🥙', '🧆', '🥚', '🍲', '🥘', '🍝', '🥫', '🍜', '🍣', '🍱'],
    activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷'],
    objects: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭'],
  };

  const [search, setSearch] = useState('');

  return (
    <div className="w-80 bg-[hsl(var(--messenger-card))] rounded-xl border border-[hsl(var(--messenger-border))] shadow-xl">
      <Tabs defaultValue="smileys" className="w-full">
        <TabsList className="w-full bg-[hsl(var(--messenger-darker-bg))] rounded-t-xl rounded-b-none p-2 grid grid-cols-7">
          <TabsTrigger value="smileys" className="text-xl p-0">😀</TabsTrigger>
          <TabsTrigger value="gestures" className="text-xl p-0">👋</TabsTrigger>
          <TabsTrigger value="hearts" className="text-xl p-0">❤️</TabsTrigger>
          <TabsTrigger value="animals" className="text-xl p-0">🐶</TabsTrigger>
          <TabsTrigger value="food" className="text-xl p-0">🍕</TabsTrigger>
          <TabsTrigger value="activities" className="text-xl p-0">⚽</TabsTrigger>
          <TabsTrigger value="objects" className="text-xl p-0">💻</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-64">
          {Object.entries(emojiCategories).map(([category, emojis]) => (
            <TabsContent key={category} value={category} className="p-2 mt-0">
              <div className="grid grid-cols-8 gap-1">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="h-10 w-10 p-0 text-2xl hover:bg-[hsl(var(--messenger-darker-bg))]"
                    onClick={() => onSelect(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </TabsContent>
          ))}
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default EmojiPicker;
