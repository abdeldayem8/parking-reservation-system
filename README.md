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

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn**
- **Backend API** server running (see backend setup)

### Installation & Setup

1. **Clone and navigate**
   ```bash
   git clone <repository-url>
   cd parking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   
   Create `.env.local` file in the project root:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   VITE_WS_URL=ws://localhost:3000/api/v1/ws
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   ```
   🌐 Frontend: http://localhost:5173
   📡 API: http://localhost:3000/api/v1
   🔌 WebSocket: ws://localhost:3000/api/v1/ws
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run Jest test suite
npm run test:watch   # Run tests in watch mode

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### 🔧 Backend Setup Required

**The frontend requires a running backend server. Ensure:**

1. **Backend API** is running on `http://localhost:3000`
2. **WebSocket server** is available at `ws://localhost:3000`
3. **Database** is seeded with test data
4. **CORS** is configured for `http://localhost:5173`

**Test Credentials:**
```
Admin:    admin / admin123
Employee: employee / employee123
```

### 🚨 Troubleshooting

**Common Issues:**

1. **"Network Error" / API calls failing**
   ```bash
   # Check if backend is running
   curl http://localhost:3000/api/v1/master/gates
   
   # Verify environment variables
   cat .env.local
   ```

2. **WebSocket connection failed**
   ```bash
   # Check WebSocket endpoint
   # Open DevTools → Network → WS tab
   # Should see connection to ws://localhost:3000/api/v1/ws
   ```

3. **Login fails with 401**
   ```bash
   # Ensure backend database is seeded with test users
   # Check backend logs for authentication errors
   ```

4. **Build errors**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

5. **Port 5173 already in use**
   ```bash
   # Kill existing process or use different port
   npm run dev -- --port 3001
   ```

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

### Automated Tests

Run the test suite with:
```bash
npm test
# or for specific test
npm test -- GateScreen.test.tsx
```

**Key Test Coverage:**
- ✅ GO button enable/disable based on zone selection
- ✅ Zone card disabled when `availableForVisitors <= 0` 
- ✅ Zone card disabled when `open === false`
- ✅ All required zone information display
- ✅ Click handlers and user interactions
- ✅ Loading and error states

### Manual Verification Steps

#### 🎯 **1. Gate Screen - Zone Selection Flow**

**Test Zone Availability Logic:**
1. Navigate to `http://localhost:5173/gate/gate_1`
2. Verify header shows:
   - Gate name (e.g., "Main Entrance (gate_1)")
   - WebSocket status indicator (colored dot)
   - Current time (updates every second)
3. **Test Visitor Flow:**
   - Ensure "Visitor" tab is selected
   - Find a zone with `availableForVisitors = 0` → Should be **disabled/grayed out**
   - Find a zone with `availableForVisitors > 0` → Should be **clickable**
   - Select available zone → GO button should become **enabled**
   - Click GO → Should show ticket modal
4. **Test Closed Zone:**
   - Look for zones with red "Closed" badge → Should be **disabled**

#### 🔌 **2. WebSocket Real-time Updates**

**Setup Multiple Browser Windows:**
1. **Window 1**: Open `http://localhost:5173/gate/gate_1`
2. **Window 2**: Open checkpoint or admin panel
3. **Test Live Updates:**
   - In Window 1: Watch zone availability numbers
   - In Window 2: Perform check-in/checkout
   - **Verify**: Window 1 shows updated availability in real-time
   - **Verify**: WebSocket status stays "Connected" (green dot)

**WebSocket Connection Test:**
1. Open browser DevTools → Network → WS tab
2. Navigate to gate details page
3. **Verify**: WebSocket connection established to `ws://localhost:3000/api/v1/ws`
4. **Verify**: Subscribe message sent: `{"type":"subscribe","payload":{"gateId":"gate_1"}}`
5. Perform actions in another window
6. **Verify**: Incoming `zone-update` messages in WebSocket tab

#### 👤 **3. Seeded User Login & Authentication**

**Admin User:**
```
Username: admin
Password: admin123
```
1. Navigate to `http://localhost:5173/admin/login`
2. Login with admin credentials
3. **Verify**: Redirected to `/admin` dashboard
4. **Test Features**: Reports, Control Panel, Employee Management

**Employee User:**
```
Username: employee  
Password: employee123
```
1. Navigate to `http://localhost:5173/checkpoint`
2. **Verify**: Login form appears (employee routes are protected)
3. Login with employee credentials  
4. **Verify**: Access to checkpoint functionality

#### 🎫 **4. Complete Check-in Flow**

**Visitor Check-in:**
1. Go to gate details page
2. Select "Visitor" tab
3. Choose zone with `availableForVisitors > 0`
4. Click "GO" button
5. **Verify**: 
   - POST request to `/tickets/checkin` with `{gateId, zoneId, type: "visitor"}`
   - Success: Ticket modal appears with ticket ID, timestamp, zone info
   - Zone availability decreases by 1
   - WebSocket broadcasts zone-update

**Subscriber Check-in:**
1. Select "Subscriber" tab
2. Enter test subscription ID (check backend for seeded data)
3. Click "Verify" → Should show subscription details
4. Select compatible zone (matching category)
5. Click "GO"
6. **Verify**: POST request includes `subscriptionId`

#### 📊 **5. Checkpoint - Ticket Breakdown Display**

1. Navigate to `/checkpoint`
2. Login as employee
3. Enter valid ticket ID (from previous check-in)
4. **Verify Display Shows:**
   - Ticket information (ID, type, timestamps)
   - Duration calculation
   - Rate breakdown (base rate, special rate if applicable)
   - Total amount
   - Zone and gate information
5. **Test Subscriber Conversion:**
   - For subscriber tickets: "Convert to Visitor" option
   - Verify breakdown changes when converted

#### 🔧 **6. Admin Real-time Updates**

1. **Window 1**: Admin Control Panel (`/admin/control`)
2. **Window 2**: Gate details page
3. **Test Actions:**
   - In Window 1: Toggle zone open/close
   - **Verify**: Window 2 shows zone status change immediately
   - In Window 1: Update category rates  
   - **Verify**: Window 2 shows new rates
   - **Verify**: Admin audit log shows actions with timestamps

#### 📱 **7. Responsive Design Test**

1. **Desktop**: Full layout with all information visible
2. **Mobile**: 
   - Navigate on mobile device or DevTools mobile view
   - **Verify**: 
     - Zone cards stack properly
     - Header information reorganizes
     - Buttons remain accessible
     - Touch interactions work

#### ⚠️ **8. Error Handling**

**Test Error States:**
1. **Network Errors**: Disconnect internet, verify error messages
2. **Invalid Subscription**: Enter non-existent subscription ID
3. **Unauthorized Access**: Try accessing admin routes without login
4. **WebSocket Disconnection**: Kill WebSocket, verify "Disconnected" status
5. **409 Conflict**: Try check-in to full zone (if available)




### Expected Test Results

✅ **Zone Selection**: Only available zones selectable for visitors  
✅ **GO Button**: Disabled when no zone selected  
✅ **Real-time**: Immediate updates via WebSocket  
✅ **Authentication**: Proper role-based access control  
✅ **Error Handling**: User-friendly error messages  
✅ **Responsive**: Works on all screen sizes





## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Environment Variables for Production

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_WS_URL=ws://localhost:3000/api/v1/ws
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





