# Parking Reservation System - Frontend

A modern React-based frontend application for a parking reservation system that supports gate check-in (visitor & subscriber), checkpoint checkout (employee), and admin control panel.

## 🚀 Project Overview

This frontend application provides a complete user interface for managing parking reservations with real-time updates via WebSocket connections. The system supports multiple user types and provides a seamless parking experience.

### Key Features

- **Gate Check-in System**: Support for both visitors and subscribers
- **Real-time Updates**: WebSocket integration for live zone status updates
- **Admin Dashboard**: Complete administrative control panel
- **Checkpoint System**: Employee checkout functionality
- **Responsive Design**: Mobile and desktop optimized UI
- **Modern Tech Stack**: React, TypeScript, Tailwind CSS, React Query

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: React Query for server state
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **WebSocket**: Native WebSocket API
- **Build Tool**: Vite
- **Routing**: React Router DOM

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Gate/            # Gate-related components
│   │   ├── GateCard.tsx
│   │   ├── GateHeader.tsx
│   │   ├── GateListUi.tsx
│   │   └── ZoneCard.tsx
│   ├── Checkin/         # Check-in flow components
│   │   ├── CheckinButton.tsx
│   │   ├── CheckinTabs.tsx
│   │   ├── SubscriptionInput.tsx
│   │   └── TicketModal.tsx
│   ├── UI/              # Generic UI components
│   │   ├── ErrorDisplay.tsx
│   │   ├── ErrorState.tsx
│   │   ├── LoadingState.tsx
│   │   ├── NotFoundState.tsx
│   │   ├── SkeletonCard.tsx
│   │   └── EmptyState.tsx
│   ├── Admin/           # Admin-specific components
│   │   └── AdminReports.tsx
│   └── Hooks/           # Custom React hooks
│       ├── useAuth.ts
│       ├── useAdmin.ts
│       ├── useMasterData.ts
│       ├── useSubscriptions.ts
│       ├── useTickets.ts
│       ├── useGateDetailsPage.ts
│       └── index.ts
├── pages/               # Page components
│   ├── Admin.tsx
│   ├── checkPoint.tsx
│   ├── GateDetails.tsx
│   └── GatesList.tsx
├── services/            # API and WebSocket services
│   ├── api.ts
│   └── ws.ts
├── Config/              # Configuration files
│   ├── Config.ts
│   └── endpoints.ts
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd parking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_WS_URL=ws://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## 🔧 API Usage

### Base Configuration

The application uses a centralized API configuration:

```typescript
// src/Config/Config.ts
export const API_URL = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});
```

### Available API Services

#### 1. Authentication API
```typescript
import { authApi } from './services/api';

// Login
const loginData = await authApi.login({ username, password });

// Logout
await authApi.logout();
```

#### 2. Master Data API
```typescript
import { masterApi } from './services/api';

// Get all gates
const gates = await masterApi.getGates();

// Get zones for a specific gate
const zones = await masterApi.getZones(gateId);

// Get categories
const categories = await masterApi.getCategories();
```

#### 3. Ticket API
```typescript
import { ticketApi } from './services/api';

// Check-in
const ticket = await ticketApi.checkin({
  gateId,
  zoneId,
  type: 'visitor' | 'subscriber',
  subscriptionId?: string
});

// Check-out
const checkout = await ticketApi.checkout({
  ticketId,
  forceConvertToVisitor?: boolean
});

// Get ticket details
const ticketDetails = await ticketApi.getTicket(ticketId);
```

#### 4. Admin API
```typescript
import { adminApi } from './services/api';

// Get parking state report
const report = await adminApi.getParkingStateReport();

// Get all users
const users = await adminApi.getUsers();

// Create user
const newUser = await adminApi.createUser(userData);

// Update zone status
await adminApi.updateZoneStatus(zoneId, { open: true });

// Update category rates
await adminApi.updateCategoryRates(categoryId, { rateNormal, rateSpecial });
```

#### 5. Subscription API
```typescript
import { subscriptionApi } from './services/api';

// Get subscription details
const subscription = await subscriptionApi.getSubscription(subscriptionId);
```

### React Query Hooks

The application provides custom hooks for all API operations:

```typescript
import { 
  useGates, 
  useZones, 
  useCheckin, 
  useCheckout,
  useLogin,
  useLogout 
} from './components/Hooks';

// In your component
const { data: gates, isLoading, error } = useGates();
const checkinMutation = useCheckin();
const loginMutation = useLogin();
```

## 🔌 WebSocket Integration

### Connection Setup

```typescript
import { useWebSocket } from './services/ws';

// Subscribe to gate updates
const ws = useWebSocket(gateId);

// Handle zone updates
ws.on('zone-update', (data) => {
  // Update zone state
});

// Handle admin updates
ws.on('admin-update', (data) => {
  // Update admin dashboard
});
```

### WebSocket Events

- **`zone-update`**: Real-time zone status changes
- **`admin-update`**: Administrative actions and changes
- **`connection-status`**: WebSocket connection state

## 🎨 UI Components

### Gate Components

- **`GateCard`**: Individual gate display with zones and navigation
- **`GateHeader`**: Gate information with WebSocket status and time
- **`ZoneCard`**: Zone details with availability and rates
- **`GateListUi`**: Grid layout for multiple gates

### Check-in Components

- **`CheckinTabs`**: Visitor/Subscriber tab switcher
- **`SubscriptionInput`**: Subscription ID verification
- **`CheckinButton`**: Check-in action button
- **`TicketModal`**: Printable ticket display

### UI Components

- **`LoadingState`**: Full-page loading spinner
- **`ErrorState`**: Error display with retry option
- **`NotFoundState`**: 404-style not found display
- **`SkeletonCard`**: Loading skeleton for cards

## 🧪 Testing

### Manual Testing Steps

1. **Gate Check-in Flow**
   - Navigate to `/gate/gate_1`
   - Switch between Visitor and Subscriber tabs
   - Select an available zone
   - Complete check-in process
   - Verify ticket modal appears

2. **WebSocket Updates**
   - Open gate details page
   - Perform check-in/check-out from another session
   - Verify real-time updates in zone cards

3. **Admin Dashboard**
   - Login as admin user
   - Navigate to `/admin`
   - Test zone open/close functionality
   - Update category rates

### Test Users

The backend provides seeded test users:
- **Admin**: `admin` / `admin123`
- **Employee**: `employee` / `employee123`

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Environment Variables for Production

```env
VITE_API_BASE_URL=https://your-api-domain.com
VITE_WS_URL=wss://your-api-domain.com
```

## 📝 Development Notes

### Key Implementation Decisions

1. **Component Organization**: Components are organized by feature (Gate, Checkin, UI, Admin)
2. **Custom Hooks**: Business logic is encapsulated in custom hooks for reusability
3. **Error Handling**: Comprehensive error states with user-friendly messages
4. **Real-time Updates**: WebSocket integration for live data synchronization
5. **Responsive Design**: Mobile-first approach with Tailwind CSS

### Known Issues

- WebSocket reconnection logic could be enhanced
- Offline caching for zone states (future enhancement)
- Additional test coverage needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.