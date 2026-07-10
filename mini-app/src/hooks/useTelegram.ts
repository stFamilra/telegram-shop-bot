import { useEffect, useRef, useState } from "react";
import type { WebAppUser } from "@twa-dev/types";

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  initDataUnsafe?: {
    user?: WebAppUser;
  };
}

export const useTelegram = () => {
  const [user, setUser] = useState<WebAppUser | null>(null);
  const webAppRef = useRef<TelegramWebApp | null>(null);

  useEffect(() => {
    const tg = (window as Window & { Telegram?: { WebApp: TelegramWebApp } })
      .Telegram?.WebApp;

    if (tg) {
      webAppRef.current = tg;
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe?.user) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUser(tg.initDataUnsafe.user);
      }
    } else {
      console.warn("Telegram WebApp не доступен (режим разработки)");
    }
  }, []);

  const sendData = (data: unknown) => {
    if (webAppRef.current) {
      webAppRef.current.sendData(JSON.stringify(data));
    } else {
      console.log("Мок-отправка данных:", data);
    }
  };

  const close = () => {
    webAppRef.current?.close();
  };

  return { user, sendData, close };
};
