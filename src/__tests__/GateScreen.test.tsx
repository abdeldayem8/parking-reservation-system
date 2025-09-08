import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CheckinButton from '../components/Checkin/CheckinButton';

// Mock Zustand stores
jest.mock('../store/auth', () => ({
  useAuthStore: () => ({
    token: 'mock-token',
    user: { id: '1', name: 'Test User' },
    isAuthenticated: true,
  }),
}));

jest.mock('../store/ticket', () => ({
  useTicketStore: () => ({
    ticket: null,
    setTicket: jest.fn(),
    clearTicket: jest.fn(),
    updateCheckout: jest.fn(),
  }),
}));

// Mock API calls
jest.mock('../services/api', () => ({
  masterApi: {
    getGates: jest.fn(),
    getZones: jest.fn(),
  },
  ticketApi: {
    checkin: jest.fn(),
  },
}));

// Mock WebSocket
jest.mock('../services/ws', () => ({
  createGateWebSocket: jest.fn(() => ({
    close: jest.fn(),
  })),
}));

// Mock useParams to return a gate ID
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ gateId: 'gate-1' }),
  useNavigate: () => jest.fn(),
}));

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('GateScreen GO Button', () => {
  const mockOnCheckin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should disable GO button when disabled prop is true', () => {
    render(
      <TestWrapper>
        <CheckinButton
          onCheckin={mockOnCheckin}
          disabled={true}
          isLoading={false}
        />
      </TestWrapper>
    );

    const goButton = screen.getByRole('button', { name: /go/i }) as HTMLButtonElement;
    expect(goButton.disabled).toBe(true);
    expect(goButton.className).toContain('disabled:bg-gray-400');
    expect(goButton.className).toContain('disabled:cursor-not-allowed');
  });

  it('should enable GO button when disabled prop is false', () => {
    render(
      <TestWrapper>
        <CheckinButton
          onCheckin={mockOnCheckin}
          disabled={false}
          isLoading={false}
        />
      </TestWrapper>
    );

    const goButton = screen.getByRole('button', { name: /go/i }) as HTMLButtonElement;
    expect(goButton.disabled).toBe(false);
    expect(goButton.className).toContain('bg-blue-600');
    expect(goButton.className).toContain('hover:bg-blue-700');
  });

  it('should show loading state when isLoading is true', () => {
    render(
      <TestWrapper>
        <CheckinButton
          onCheckin={mockOnCheckin}
          disabled={false}
          isLoading={true}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Processing...')).toBeTruthy();
    expect(screen.queryByText('GO')).toBeFalsy();
  });

  it('should call onCheckin when button is clicked and not disabled', () => {
    render(
      <TestWrapper>
        <CheckinButton
          onCheckin={mockOnCheckin}
          disabled={false}
          isLoading={false}
        />
      </TestWrapper>
    );

    const goButton = screen.getByRole('button', { name: /go/i });
    fireEvent.click(goButton);
    
    expect(mockOnCheckin).toHaveBeenCalledTimes(1);
  });

  it('should not call onCheckin when button is disabled', () => {
    render(
      <TestWrapper>
        <CheckinButton
          onCheckin={mockOnCheckin}
          disabled={true}
          isLoading={false}
        />
      </TestWrapper>
    );

    const goButton = screen.getByRole('button', { name: /go/i });
    fireEvent.click(goButton);
    
    expect(mockOnCheckin).not.toHaveBeenCalled();
  });

  it('should be disabled when no zone is selected', () => {
    // Test the correct behavior: GO button is disabled when no zone is selected
    const hasSelectedZone = false;
    const buttonDisabled = !hasSelectedZone;
    
    render(
      <TestWrapper>
        <CheckinButton
          onCheckin={mockOnCheckin}
          disabled={buttonDisabled}
          isLoading={false}
        />
      </TestWrapper>
    );

    const goButton = screen.getByRole('button', { name: /go/i }) as HTMLButtonElement;
    expect(goButton.disabled).toBe(true);
  });

  it('should be enabled when valid zone is selected', () => {
    // Test the correct behavior: GO button is enabled when a valid zone is selected
    // (zones with availableForVisitors <= 0 cannot be selected in the first place)
    const hasSelectedZone = true;
    const buttonDisabled = !hasSelectedZone;
    
    render(
      <TestWrapper>
        <CheckinButton
          onCheckin={mockOnCheckin}
          disabled={buttonDisabled}
          isLoading={false}
        />
      </TestWrapper>
    );

    const goButton = screen.getByRole('button', { name: /go/i }) as HTMLButtonElement;
    expect(goButton.disabled).toBe(false);
  });
});

describe('GateScreen Zone Selection Flow', () => {
  // Import ZoneCard for integration testing
  const ZoneCard = require('../components/Gate/ZoneCard').default;
  
  const mockOnSelect = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockZone = (availableForVisitors: number, open: boolean = true) => ({
    id: 'zone-1',
    name: 'Zone A',
    categoryId: 'standard',
    occupied: 5,
    free: 15,
    reserved: 2,
    availableForVisitors,
    availableForSubscribers: 10,
    rateNormal: 5,
    rateSpecial: 8,
    open,
    specialActive: false,
  });

  it('should disable zone selection when availableForVisitors is 0 (visitor flow)', () => {
    const mockZone = createMockZone(0); // 0 available for visitors
    
    render(
      <TestWrapper>
        <ZoneCard
          zone={mockZone}
          disabled={!mockZone.open || mockZone.availableForVisitors <= 0} // Matches actual logic
          selected={false}
          onSelect={mockOnSelect}
          isVisitor={true}
        />
      </TestWrapper>
    );

    // Zone should be disabled (grayed out and not clickable)
    const zoneButton = screen.getByRole('button', { name: /zone a/i }) as HTMLButtonElement;
    expect(zoneButton.disabled).toBe(true);
    expect(zoneButton.className).toContain('opacity-60');
    expect(zoneButton.className).toContain('cursor-not-allowed');

    // Verify availability is shown in red
    expect(screen.getByText('0')).toBeTruthy(); // availableForVisitors
    const availabilityElement = screen.getByText('0').closest('div');
    expect(availabilityElement?.className).toContain('text-red-600');
  });

  it('should enable zone selection when availableForVisitors > 0 (visitor flow)', () => {
    const mockZone = createMockZone(5); // 5 available for visitors
    
    render(
      <TestWrapper>
        <ZoneCard
          zone={mockZone}
          disabled={!mockZone.open || mockZone.availableForVisitors <= 0} // Matches actual logic
          selected={false}
          onSelect={mockOnSelect}
          isVisitor={true}
        />
      </TestWrapper>
    );

    // Zone should be enabled and clickable
    const zoneButton = screen.getByRole('button', { name: /zone a/i }) as HTMLButtonElement;
    expect(zoneButton.disabled).toBe(false);
    expect(zoneButton.className).not.toContain('opacity-60');
    expect(zoneButton.className).toContain('cursor-pointer');

    // Should be able to click the zone
    fireEvent.click(zoneButton);
    expect(mockOnSelect).toHaveBeenCalledWith('zone-1');
  });

  it('should disable zone selection when zone is closed', () => {
    const mockZone = createMockZone(5, false); // Zone is closed
    
    render(
      <TestWrapper>
        <ZoneCard
          zone={mockZone}
          disabled={!mockZone.open || mockZone.availableForVisitors <= 0} // Matches actual logic
          selected={false}
          onSelect={mockOnSelect}
          isVisitor={true}
        />
      </TestWrapper>
    );

    // Zone should be disabled because it's closed
    const zoneButton = screen.getByRole('button', { name: /zone a/i }) as HTMLButtonElement;
    expect(zoneButton.disabled).toBe(true);
    
    // Should show "Closed" status
    expect(screen.getByText('Closed')).toBeTruthy();
    const closedBadge = screen.getByText('Closed').closest('div');
    expect(closedBadge?.className).toContain('bg-red-100');
  });

  it('should show all required zone information', () => {
    const mockZone = createMockZone(8);
    
    render(
      <TestWrapper>
        <ZoneCard
          zone={mockZone}
          disabled={false}
          selected={false}
          onSelect={mockOnSelect}
          isVisitor={true}
        />
      </TestWrapper>
    );

    // Verify all required fields are displayed
    expect(screen.getByText('Zone A')).toBeTruthy(); // name
    expect(screen.getByText('Category: standard')).toBeTruthy(); // category
    expect(screen.getByText('5')).toBeTruthy(); // occupied
    expect(screen.getByText('15')).toBeTruthy(); // free
    expect(screen.getByText('2')).toBeTruthy(); // reserved
    expect(screen.getByText('8')).toBeTruthy(); // availableForVisitors
    expect(screen.getByText('10')).toBeTruthy(); // availableForSubscribers
    expect(screen.getByText('$5')).toBeTruthy(); // rateNormal
    expect(screen.getByText('$8')).toBeTruthy(); // rateSpecial
    expect(screen.getByText('Open')).toBeTruthy(); // open status
    
    // Verify availability labels
    expect(screen.getByText('Available (Visitors)')).toBeTruthy();
    expect(screen.getByText('Available (Subscribers)')).toBeTruthy();
  });
});
