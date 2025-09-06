import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Ticket {
  id: string;
  type: 'visitor' | 'subscriber';
  gateId: string;
  zoneId: string;
  checkinAt: string;
  checkoutAt: string | null;
  subscriptionId?: string | null;
}

interface TicketState {
  ticket: Ticket | null;
  setTicket: (ticket: Ticket) => void;
  clearTicket: () => void;
  updateCheckout: (checkoutAt: string) => void;
}

export const useTicketStore = create<TicketState>()(
  persist(
    (set, get) => ({
      ticket: null,

      setTicket: (ticket: Ticket) => {
        set({ ticket });
      },

      clearTicket: () => {
        set({ ticket: null });
      },

      updateCheckout: (checkoutAt: string) => {
        const currentTicket = get().ticket;
        if (currentTicket) {
          set({
            ticket: {
              ...currentTicket,
              checkoutAt,
            },
          });
        }
      },
    }),
    {
      name: 'ticket-storage',
      storage: {
        getItem: (name) => {
          const str = sessionStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          sessionStorage.removeItem(name);
        },
      },
    }
  )
);
