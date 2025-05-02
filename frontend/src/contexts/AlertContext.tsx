import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Alert as AlertComponent, AlertsWrapper } from "../components/Alert";

export interface Alert {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface AlertProviderProps {
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  clearAlerts: () => void;
  addAlert: (alert: Omit<Alert, "id">) => void;
  dismissAlert: (id: string) => void;
}

const AlertContext = createContext<AlertProviderProps>({
  alerts: [],
  setAlerts: () => {},
  clearAlerts: () => {},
  addAlert: () => {},
  dismissAlert: () => {},
});

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const clearAlerts = () => setAlerts([]);

  const addAlert = (alert: Omit<Alert, "id">) => {
    const id = uuidv4();
    setAlerts((prev) => [{ ...alert, id: id }, ...prev]);
  };

  const dismissAlert = (id: string) => {
    const timeout = 200;
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id != id));
    }, timeout);
  };

  let state: AlertProviderProps = {
    alerts: alerts,
    setAlerts: setAlerts,
    clearAlerts: clearAlerts,
    addAlert: addAlert,
    dismissAlert: dismissAlert,
  };

  return (
    <AlertContext.Provider value={{ ...state }}>
      <AlertsWrapper>
        {alerts.map((alert) => (
          <AlertComponent
            key={alert.id}
            alert={alert}
            handleDismiss={() => {
              dismissAlert(alert.id);
            }}
          />
        ))}
      </AlertsWrapper>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;

export const useAlert = () => {
  return useContext(AlertContext);
};
