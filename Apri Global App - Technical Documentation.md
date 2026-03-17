# Apri Global App - Technical Documentation

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Development Setup](#development-setup)
5. [API Integration](#api-integration)
6. [Security Implementation](#security-implementation)
7. [Deployment Guide](#deployment-guide)
8. [Performance Optimization](#performance-optimization)
9. [Testing Strategy](#testing-strategy)
10. [Monitoring & Analytics](#monitoring--analytics)

---

## Architecture Overview

### Frontend Architecture

```
┌─────────────────────────────────────────┐
│         Mobile App (React Native)        │
├─────────────────────────────────────────┤
│  Expo Router (Navigation)                │
│  NativeWind (Styling)                   │
│  React Context (State Management)       │
│  AsyncStorage (Local Persistence)       │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│    API Layer (tRPC Client)              │
├─────────────────────────────────────────┤
│  JWT Authentication                     │
│  Request/Response Interceptors          │
│  Error Handling                         │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│    Backend Services (Optional)          │
├─────────────────────────────────────────┤
│  Express.js Server                      │
│  PostgreSQL Database                    │
│  S3 File Storage                        │
└─────────────────────────────────────────┘
```

### Key Components

| Component | Purpose | Technology |
|-----------|---------|-----------|
| Navigation | Screen routing and deep linking | Expo Router 6 |
| State Management | Global app state | React Context + useReducer |
| Styling | UI styling and theming | NativeWind (Tailwind CSS) |
| Storage | Local data persistence | AsyncStorage / MMKV |
| API Client | Backend communication | tRPC + Axios |
| Authentication | User login and sessions | JWT tokens + OAuth 2.0 |

---

## Technology Stack

### Frontend
```json
{
  "runtime": "React Native 0.81.5",
  "framework": "Expo SDK 54",
  "language": "TypeScript 5.9",
  "styling": "NativeWind 4.2.1 (Tailwind CSS 3.4.17)",
  "navigation": "Expo Router 6.0.19",
  "state_management": "React Context + useReducer",
  "api_client": "tRPC 11.7.2 + Axios 1.13.2",
  "animations": "React Native Reanimated 4.1.6",
  "storage": "AsyncStorage 2.2.0 + MMKV",
  "notifications": "Expo Notifications 0.32.15",
  "authentication": "Expo Secure Store 15.0.8",
  "media": "Expo Image 3.0.11, Expo Video 3.0.15"
}
```

### Backend (Optional)
```json
{
  "runtime": "Node.js 22.13.0",
  "framework": "Express.js 4.22.1",
  "database": "PostgreSQL with Drizzle ORM 0.44.7",
  "api": "tRPC 11.7.2",
  "authentication": "JWT (jose 6.1.0) + OAuth 2.0",
  "storage": "S3-compatible (R2, MinIO)",
  "file_handling": "Multer, Busboy",
  "validation": "Zod 4.2.1",
  "testing": "Vitest 2.1.9"
}
```

---

## Project Structure

```
apri-mobile-app/
├── app/
│   ├── _layout.tsx                 # Root layout with providers
│   ├── oauth/                      # OAuth callback handler
│   └── (tabs)/
│       ├── _layout.tsx             # Tab navigation layout
│       ├── index.tsx               # Home screen
│       ├── menu.tsx                # Menu browsing
│       ├── orders.tsx              # Order history & tracking
│       ├── rewards.tsx             # Loyalty program
│       └── account.tsx             # User profile
├── components/
│   ├── screen-container.tsx        # SafeArea wrapper
│   ├── themed-view.tsx             # Themed background view
│   └── ui/
│       ├── icon-symbol.tsx         # Icon mapping
│       └── [other UI components]
├── hooks/
│   ├── use-auth.ts                 # Authentication hook
│   ├── use-colors.ts               # Theme colors hook
│   └── use-color-scheme.ts         # Dark/light mode detection
├── lib/
│   ├── trpc.ts                     # tRPC client configuration
│   ├── utils.ts                    # Utility functions (cn)
│   ├── theme-provider.tsx          # Global theme context
│   └── _core/
│       ├── theme.ts                # Runtime palette builder
│       └── nativewind-pressable.ts # NativeWind Pressable fix
├── constants/
│   ├── theme.ts                    # Theme exports
│   └── colors.ts                   # Color definitions
├── types/
│   └── index.ts                    # TypeScript type definitions
├── context/
│   └── AppContext.tsx              # Global app context
├── assets/
│   └── images/
│       ├── icon.png                # App icon
│       ├── splash-icon.png         # Splash screen
│       ├── favicon.png             # Web favicon
│       └── android-icon-*.png      # Android adaptive icons
├── app.config.ts                   # Expo configuration
├── tailwind.config.js              # Tailwind CSS config
├── theme.config.js                 # Theme color tokens
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
└── global.css                      # Global styles

server/                              # (Optional backend)
├── _core/
│   └── index.ts                    # Server entry point
├── routes/
│   ├── auth.ts                     # Authentication routes
│   ├── orders.ts                   # Order management
│   └── [other routes]
├── db/
│   ├── schema.ts                   # Database schema
│   └── migrations/                 # Database migrations
└── middleware/
    ├── auth.ts                     # Authentication middleware
    └── [other middleware]
```

---

## Development Setup

### Prerequisites

```bash
# Node.js 18+ with pnpm
node --version  # v18.0.0+
pnpm --version  # 9.12.0+

# Expo CLI
npm install -g expo-cli

# iOS development (macOS only)
xcode-select --install
```

### Installation

```bash
# Clone repository
git clone [repository-url]
cd apri-mobile-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### Development Commands

```bash
# Start development server
pnpm dev

# Start with specific platform
pnpm ios          # iOS simulator
pnpm android      # Android emulator
pnpm web          # Web browser

# Type checking
pnpm check

# Linting
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Build for production
pnpm build

# Generate QR code for Expo Go
pnpm qr
```

---

## API Integration

### tRPC Setup

```typescript
// lib/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server';

export const trpc = createTRPCReact<AppRouter>();
```

### Usage Example

```typescript
// Fetching data
const { data: orders } = trpc.orders.list.useQuery();

// Mutation
const createOrder = trpc.orders.create.useMutation({
  onSuccess: (data) => {
    console.log('Order created:', data);
  },
});

// Usage
createOrder.mutate({
  items: [...],
  deliveryAddress: {...},
});
```

### Authentication Flow

```typescript
// 1. Login
const { mutate: login } = trpc.auth.login.useMutation();

// 2. Token storage
await SecureStore.setItemAsync('authToken', token);

// 3. API requests include token
// (Automatically handled by interceptors)

// 4. Logout
await SecureStore.deleteItemAsync('authToken');
```

---

## Security Implementation

### 1. Data Encryption

```typescript
// End-to-end encryption for sensitive data
import * as Crypto from 'expo-crypto';

const encryptData = async (data: string, key: string) => {
  const encrypted = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    data + key
  );
  return encrypted;
};
```

### 2. Secure Storage

```typescript
// Store sensitive data securely
import * as SecureStore from 'expo-secure-store';

// Save token
await SecureStore.setItemAsync('authToken', token);

// Retrieve token
const token = await SecureStore.getItemAsync('authToken');

// Delete token
await SecureStore.deleteItemAsync('authToken');
```

### 3. Biometric Authentication

```typescript
import * as LocalAuthentication from 'expo-local-authentication';

const authenticate = async () => {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      disableDeviceFallback: false,
      reason: 'Authenticate to access your account',
    });
    return result.success;
  } catch (error) {
    console.error('Authentication error:', error);
  }
};
```

### 4. HTTPS & Certificate Pinning

```typescript
// All API requests use HTTPS
// Certificate pinning configured in native layers
```

### 5. Input Validation

```typescript
import { z } from 'zod';

const OrderSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    quantity: z.number().min(1),
  })),
  deliveryAddress: z.object({
    street: z.string(),
    city: z.string(),
    zipCode: z.string(),
  }),
});

// Validate before sending
const validatedOrder = OrderSchema.parse(orderData);
```

---

## Deployment Guide

### iOS Deployment

```bash
# Build for iOS
pnpm build:ios

# Submit to App Store
eas submit --platform ios
```

### Android Deployment

```bash
# Build for Android
pnpm build:android

# Submit to Google Play
eas submit --platform android
```

### Web Deployment

```bash
# Build for web
pnpm build:web

# Deploy to hosting service
# (Vercel, Netlify, AWS, etc.)
```

### Environment Configuration

```bash
# .env.local
EXPO_PUBLIC_API_URL=https://api.apri.com
EXPO_PUBLIC_APP_ENV=production
EXPO_PUBLIC_SENTRY_DSN=https://...
```

---

## Performance Optimization

### 1. Code Splitting

```typescript
// Dynamic imports for lazy loading
const MenuScreen = lazy(() => import('./screens/Menu'));
```

### 2. Image Optimization

```typescript
// Use Expo Image with caching
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://...' }}
  style={{ width: 200, height: 200 }}
  cachePolicy="memory-disk"
/>
```

### 3. List Performance

```typescript
// Use FlatList for large lists
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews
  maxToRenderPerBatch={10}
/>
```

### 4. State Management

```typescript
// Use selectors to prevent unnecessary re-renders
const userName = useAppContext(state => state.user.name);
```

---

## Testing Strategy

### Unit Tests

```bash
pnpm test
```

### Example Test

```typescript
// __tests__/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice } from '@/lib/utils';

describe('formatPrice', () => {
  it('should format price correctly', () => {
    expect(formatPrice(99.99)).toBe('$99.99');
  });
});
```

### E2E Testing (Optional)

```bash
# Using Detox for E2E testing
detox test e2e/firstTest.e2e.js --configuration ios.sim.debug
```

---

## Monitoring & Analytics

### Error Tracking (Sentry)

```typescript
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: process.env.EXPO_PUBLIC_APP_ENV,
});
```

### Performance Monitoring

```typescript
// Track custom metrics
Sentry.captureMessage('Order placed successfully', 'info');

// Track errors
try {
  // code
} catch (error) {
  Sentry.captureException(error);
}
```

### User Analytics

```typescript
// Track user events
const trackEvent = (eventName: string, properties?: object) => {
  // Send to analytics service
  console.log(`Event: ${eventName}`, properties);
};

// Usage
trackEvent('order_completed', { orderId: '123', total: 99.99 });
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Metro bundler crash | Clear cache: `pnpm start --reset-cache` |
| Dependency conflicts | Reinstall: `rm -rf node_modules && pnpm install` |
| iOS build failure | Clear Xcode cache: `xcode-select --reset` |
| Android build failure | Clear Gradle cache: `cd android && ./gradlew clean` |

### Debug Mode

```bash
# Enable debug logging
DEBUG=* pnpm dev

# React Native debugger
pnpm start --dev-client
```

---

## Support & Resources

- **Expo Documentation:** https://docs.expo.dev
- **React Native Docs:** https://reactnative.dev
- **tRPC Documentation:** https://trpc.io
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org

---

## Version Information

- **Expo SDK:** 54
- **React Native:** 0.81.5
- **TypeScript:** 5.9
- **Node.js:** 18+
- **pnpm:** 9.12.0

---

**Last Updated:** March 11, 2026
**Status:** Production Ready
