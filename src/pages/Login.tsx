import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone || phone.length < 10) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code || code.length < 4) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      localStorage.setItem('yasms_user', JSON.stringify({ phone, id: 1 }));
      navigate('/chats');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length === 0) return '';
    if (numbers.length <= 1) return `+${numbers}`;
    if (numbers.length <= 4) return `+${numbers.slice(0, 1)} (${numbers.slice(1)}`;
    if (numbers.length <= 7) return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4)}`;
    if (numbers.length <= 9) return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`;
    return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`;
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--messenger-dark-bg))] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#0088CC] to-[#2AABEE] flex items-center justify-center">
            <span className="text-3xl font-bold text-white">YS</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">YaSMS WEB</h1>
          <p className="text-[hsl(var(--messenger-text-muted))]">
            Быстрый и безопасный мессенджер
          </p>
        </div>

        <div className="bg-[hsl(var(--messenger-card))] rounded-2xl p-8 shadow-2xl animate-scale-in">
          {step === 'phone' ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Вход</h2>
                <p className="text-sm text-[hsl(var(--messenger-text-muted))]">
                  Введите номер телефона для входа или регистрации
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="text-white mb-2 block">
                    Номер телефона
                  </Label>
                  <div className="relative">
                    <Icon
                      name="Phone"
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--messenger-text-muted))]"
                    />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 999-99-99"
                      value={formatPhone(phone)}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="pl-10 bg-[hsl(var(--messenger-darker-bg))] border-[hsl(var(--messenger-border))] text-white text-lg h-14"
                      maxLength={18}
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendCode}
                  disabled={isLoading || phone.length < 11}
                  className="w-full h-12 bg-[#0088CC] hover:bg-[#2AABEE] text-white text-lg font-medium"
                >
                  {isLoading ? (
                    <Icon name="Loader2" size={20} className="animate-spin" />
                  ) : (
                    'Получить код'
                  )}
                </Button>
              </div>

              <div className="mt-6 text-center text-xs text-[hsl(var(--messenger-text-muted))]">
                Нажимая «Получить код», вы принимаете условия
                <br />
                <a href="#" className="text-[#0088CC] hover:underline">
                  Пользовательского соглашения
                </a>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('phone')}
                className="flex items-center gap-2 text-[hsl(var(--messenger-text-muted))] hover:text-white mb-6 transition-colors"
              >
                <Icon name="ArrowLeft" size={20} />
                <span>Изменить номер</span>
              </button>

              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  Введите код
                </h2>
                <p className="text-sm text-[hsl(var(--messenger-text-muted))]">
                  Мы отправили SMS с кодом на номер
                  <br />
                  <span className="text-white font-medium">{formatPhone(phone)}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="code" className="text-white mb-2 block">
                    Код подтверждения
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="••••"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="bg-[hsl(var(--messenger-darker-bg))] border-[hsl(var(--messenger-border))] text-white text-center text-3xl font-bold h-16 tracking-[0.5em]"
                    maxLength={4}
                    autoFocus
                  />
                </div>

                <Button
                  onClick={handleVerifyCode}
                  disabled={isLoading || code.length < 4}
                  className="w-full h-12 bg-[#0088CC] hover:bg-[#2AABEE] text-white text-lg font-medium"
                >
                  {isLoading ? (
                    <Icon name="Loader2" size={20} className="animate-spin" />
                  ) : (
                    'Войти'
                  )}
                </Button>

                <Button
                  variant="ghost"
                  onClick={handleSendCode}
                  className="w-full text-[#0088CC] hover:bg-[hsl(var(--messenger-darker-bg))]"
                >
                  Отправить код повторно
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-[hsl(var(--messenger-text-muted))]">
            <a href="#" className="hover:text-white transition-colors">
              О нас
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              Поддержка
            </a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
