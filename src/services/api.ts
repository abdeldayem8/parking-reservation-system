import { API_URL } from "../Config/Config";
import { endpoints } from "../Config/endpoints";

// Auth
export const authApi = {
  login: async (credentials: { username: string; password: string }) => {
    const { data } = await API_URL.post(endpoints.auth.login, credentials);
    return data;
  },
};

// Master data (public read)
export const masterApi = {
  getGates: async () => {
    const { data } = await API_URL.get(endpoints.master.gates);
    return data;
  },
  
  getZones: async (gateId: string) => {
    const { data } = await API_URL.get(endpoints.master.zones(gateId));
    return data;
  },
  
  getCategories: async () => {
    const { data } = await API_URL.get(endpoints.master.categories);
    return data;
  },
};

// Admin endpoints
export const adminApi = {
  // Categories - use master endpoint since admin GET doesn't exist
  getCategories: async () => {
    const { data } = await API_URL.get('/master/categories');
    return data;
  },
  
  createCategory: async (category: any) => {
    const { data } = await API_URL.post(endpoints.admin.categories, category);
    return data;
  },
  
  updateCategory: async (id: string, category: any) => {
    const { data } = await API_URL.put(endpoints.admin.category(id), category);
    return data;
  },
  
  deleteCategory: async (id: string) => {
    const { data } = await API_URL.delete(endpoints.admin.category(id));
    return data;
  },
  
  // Zones - use master endpoint since admin zones endpoint doesn't exist
  getZones: async () => {
    const { data } = await API_URL.get('/master/zones');
    return data;
  },
  
  createZone: async (zone: any) => {
    const { data } = await API_URL.post(endpoints.admin.zones, zone);
    return data;
  },
  
  updateZone: async (id: string, zone: any) => {
    const { data } = await API_URL.put(endpoints.admin.zone(id), zone);
    return data;
  },
  
  deleteZone: async (id: string) => {
    const { data } = await API_URL.delete(endpoints.admin.zone(id));
    return data;
  },
  
  updateZoneOpen: async (id: string, open: boolean) => {
    const { data } = await API_URL.put(endpoints.admin.zoneOpen(id), { open });
    return data;
  },
  
  // Gates
  getGates: async () => {
    const { data } = await API_URL.get(endpoints.admin.gates);
    return data;
  },
  
  createGate: async (gate: any) => {
    const { data } = await API_URL.post(endpoints.admin.gates, gate);
    return data;
  },
  
  updateGate: async (id: string, gate: any) => {
    const { data } = await API_URL.put(endpoints.admin.gate(id), gate);
    return data;
  },
  
  deleteGate: async (id: string) => {
    const { data } = await API_URL.delete(endpoints.admin.gate(id));
    return data;
  },
  
  // Rush Hours
  getRushHours: async () => {
    const { data } = await API_URL.get(endpoints.admin.rushHours);
    return data;
  },
  
  createRushHour: async (rushHour: any) => {
    const { data } = await API_URL.post(endpoints.admin.rushHours, rushHour);
    return data;
  },
  
  updateRushHour: async (id: string, rushHour: any) => {
    const { data } = await API_URL.put(endpoints.admin.rushHour(id), rushHour);
    return data;
  },
  
  deleteRushHour: async (id: string) => {
    const { data } = await API_URL.delete(endpoints.admin.rushHour(id));
    return data;
  },
  
  // Vacations
  getVacations: async () => {
    const { data } = await API_URL.get(endpoints.admin.vacations);
    return data;
  },
  
  createVacation: async (vacation: any) => {
    const { data } = await API_URL.post(endpoints.admin.vacations, vacation);
    return data;
  },
  
  updateVacation: async (id: string, vacation: any) => {
    const { data } = await API_URL.put(endpoints.admin.vacation(id), vacation);
    return data;
  },
  
  deleteVacation: async (id: string) => {
    const { data } = await API_URL.delete(endpoints.admin.vacation(id));
    return data;
  },
  
  // Users
  getUsers: async () => {
    const { data } = await API_URL.get(endpoints.admin.users);
    return data;
  },
  
  createUser: async (user: any) => {
    const { data } = await API_URL.post(endpoints.admin.users, user);
    return data;
  },
  
  // Subscriptions
  getSubscriptions: async () => {
    const { data } = await API_URL.get(endpoints.admin.subscriptions);
    return data;
  },
  
  createSubscription: async (subscription: any) => {
    const { data } = await API_URL.post(endpoints.admin.subscriptions, subscription);
    return data;
  },
  
  updateSubscription: async (id: string, subscription: any) => {
    const { data } = await API_URL.put(endpoints.admin.subscription(id), subscription);
    return data;
  },
  
  deleteSubscription: async (id: string) => {
    const { data } = await API_URL.delete(endpoints.admin.subscription(id));
    return data;
  },
  
  // Reports
  getParkingStateReport: async () => {
    const { data } = await API_URL.get(endpoints.admin.reports.parkingState);
    return data;
  },

  // Rush Hours - server only has POST, no GET endpoint
  createAdminRushHour: async (rushHour: { weekDay: number; from: string; to: string }) => {
    console.log('API call - creating rush hour:', rushHour);
    const { data } = await API_URL.post('/admin/rush-hours', rushHour);
    console.log('API response - rush hour created:', data);
    return data;
  },

  // Vacations - server only has POST, no GET endpoint  
  createAdminVacation: async (vacation: { name: string; from: string; to: string }) => {
    console.log('API call - creating vacation:', vacation);
    const { data } = await API_URL.post('/admin/vacations', vacation);
    console.log('API response - vacation created:', data);
    return data;
  },
  
  // Tickets
  getTickets: async (status?: string) => {
    const { data } = await API_URL.get(endpoints.admin.tickets(status));
    return data;
  },
};

// Subscriptions
export const subscriptionApi = {
  getSubscription: async (id: string) => {
    const { data } = await API_URL.get(endpoints.subscriptions(id));
    return data;
  },
};

// Tickets
export const ticketApi = {
  checkin: async (checkinData: { gateId: string; zoneId: string; type: string; subscriptionId?: string }) => {
    const { data } = await API_URL.post(endpoints.tickets.checkin, checkinData);
    return data;
  },
  
  checkout: async (checkoutData: { ticketId: string; forceConvertToVisitor?: boolean }) => {
    const { data } = await API_URL.post(endpoints.tickets.checkout, checkoutData);
    return data;
  },
  
  getTicket: async (id: string) => {
    const { data } = await API_URL.get(endpoints.tickets.ticket(id));
    return data;
  },
};
