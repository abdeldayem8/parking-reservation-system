
export const endpoints = {
    auth: {
      login: "/auth/login",
    },
  
    master: {
      gates: "/master/gates",
      zones: (gateId: string) => `/master/zones?gateId=${gateId}`,
      categories: "/master/categories",
    },
  
    admin: {
      categories: "/admin/categories",
      category: (id: string) => `/admin/categories/${id}`,
  
      zones: "/admin/zones",
      zone: (id: string) => `/admin/zones/${id}`,
      zoneOpen: (id: string) => `/admin/zones/${id}/open`,
  
      gates: "/admin/gates",
      gate: (id: string) => `/admin/gates/${id}`,
  
      rushHours: "/admin/rush-hours",
      rushHour: (id: string) => `/admin/rush-hours/${id}`,
  
      vacations: "/admin/vacations",
      vacation: (id: string) => `/admin/vacations/${id}`,
  
      users: "/admin/users",
      subscriptions: "/admin/subscriptions",
      subscription: (id: string) => `/admin/subscriptions/${id}`,
  
      reports: {
        parkingState: "/admin/reports/parking-state",
      },
  
      tickets: (status?: string) =>
        status ? `/admin/tickets?status=${status}` : "/admin/tickets",
    },
  
    subscriptions: (id: string) => `/subscriptions/${id}`,
  
    tickets: {
      checkin: "/tickets/checkin",
      checkout: "/tickets/checkout",
      ticket: (id: string) => `/tickets/${id}`,
    },

    ws: "/ws",
  };
  