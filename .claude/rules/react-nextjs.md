# React Next.js Best Practices (App Router)

## Component Structure

### No Inline Functions in JSX (CRITICAL)

NEVER define functions inline in JSX - creates new references on every render:

```typescript
// WRONG: Inline function
function UserList({ users }: Props) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => handleClick(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  )
}

// CORRECT: Extract to handler or custom hook
function UserList({ users }: Props) {
  const { handleUserClick } = useUserActions()

  return (
    <ul>
      {users.map(user => (
        <UserListItem
          key={user.id}
          user={user}
          onClick={handleUserClick}
        />
      ))}
    </ul>
  )
}
```

### Extract Logic to Custom Hooks

Component files should contain ONLY rendering logic. Extract all business logic to hooks:

```typescript
// WRONG: Logic in component
function CheckoutForm() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  const calculateTotal = () => { /* ... */ }
  const applyDiscount = () => { /* ... */ }
  const validateCart = () => { /* ... */ }

  // ... more logic
  return <form>...</form>
}

// CORRECT: Logic in custom hook
function CheckoutForm() {
  const { items, total, applyDiscount, handleSubmit } = useCheckout()

  return <form onSubmit={handleSubmit}>...</form>
}
```

## Styling with Styled Components

### Separate Style Files (CRITICAL)

NEVER put styles inline or in the component file. Use dedicated `*.styles.ts` files:

```
components/
  Button/
    Button.tsx
    Button.styles.ts
    Button.test.tsx
    index.ts
```

### Style File Structure

```typescript
// Button.styles.ts
import styled from 'styled-components'

export const ButtonWrapper = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant }) => $variant === 'primary' && `
    background: var(--color-primary);
    color: white;
  `}

  ${({ $variant }) => $variant === 'secondary' && `
    background: transparent;
    border: 1px solid var(--color-border);
  `}
`

export const ButtonIcon = styled.span`
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`
```

### Component Usage

```typescript
// Button.tsx
'use client'

import { ButtonWrapper, ButtonIcon } from './Button.styles'
import type { ButtonProps } from './Button.types'

export function Button({ variant = 'primary', icon, children }: ButtonProps) {
  return (
    <ButtonWrapper $variant={variant}>
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
      {children}
    </ButtonWrapper>
  )
}
```

### No Inline Styles (CRITICAL)

```typescript
// WRONG: Inline styles
<div style={{ marginTop: 20, display: 'flex' }}>

// WRONG: CSS-in-JS in component file
const Wrapper = styled.div`...`
function MyComponent() { return <Wrapper /> }

// CORRECT: Import from style file
import { Wrapper } from './MyComponent.styles'
function MyComponent() { return <Wrapper /> }
```

### Transient Props

Use `$` prefix for props that shouldn't pass to DOM:

```typescript
// CORRECT: Transient prop with $
export const Card = styled.div<{ $isActive: boolean }>`
  border: ${({ $isActive }) => $isActive ? '2px solid blue' : 'none'};
`
```

## Next.js App Router

### Server vs Client Components

Default to Server Components. Only add `'use client'` when necessary:

```typescript
// CORRECT: Server Component (default) - no directive needed
// app/users/page.tsx
async function UsersPage() {
  const users = await fetchUsers() // Direct async/await

  return <UserList users={users} />
}

// CORRECT: Client Component - only when needed
// components/SearchInput/SearchInput.tsx
'use client'

import { useSearch } from './useSearch'

export function SearchInput() {
  const { query, setQuery, results } = useSearch()

  return <input value={query} onChange={e => setQuery(e.target.value)} />
}
```

### When to Use Client Components

Add `'use client'` ONLY for:
- `useState`, `useEffect`, `useReducer`, or other React hooks
- Event handlers (`onClick`, `onChange`, etc.)
- Browser-only APIs (`window`, `localStorage`, `navigator`)
- Custom hooks that use any of the above

### Component Composition Pattern

Keep client components small, push them to leaves:

```typescript
// WRONG: Entire page as client component
'use client'
export default function DashboardPage() { /* ... */ }

// CORRECT: Server page with client islands
// app/dashboard/page.tsx (Server Component)
import { DashboardStats } from './DashboardStats'
import { ActivityChart } from '@/components/ActivityChart'

export default async function DashboardPage() {
  const stats = await fetchStats()

  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardStats stats={stats} />
      <ActivityChart /> {/* Only this is 'use client' */}
    </div>
  )
}
```

### Data Fetching

```typescript
// CORRECT: Fetch in Server Components
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id)

  return <ProductDetails product={product} />
}

// CORRECT: Parallel data fetching
async function DashboardPage() {
  const [users, orders, analytics] = await Promise.all([
    fetchUsers(),
    fetchOrders(),
    fetchAnalytics()
  ])

  return <Dashboard users={users} orders={orders} analytics={analytics} />
}
```

### Metadata & SEO

```typescript
// app/products/[id]/page.tsx
import type { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await fetchProduct(params.id)

  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image] }
  }
}
```

## Airbnb React/JSX Style Guide

### Naming Conventions

```typescript
// Components: PascalCase
export function UserProfileCard() { /* ... */ }

// Hooks: camelCase with 'use' prefix
export function useUserProfile() { /* ... */ }

// Props interfaces: PascalCase with 'Props' suffix
interface UserProfileCardProps { /* ... */ }

// Style components: PascalCase with descriptive suffix
export const UserProfileWrapper = styled.div``
export const UserProfileAvatar = styled.img``

// Event handlers: 'handle' prefix in component, 'on' prefix in props
interface ButtonProps {
  onSubmit: () => void  // prop name
}
function Form({ onSubmit }: FormProps) {
  const handleSubmit = () => { onSubmit() }  // handler name
}

// Boolean props: 'is', 'has', 'should' prefix
interface ModalProps {
  isOpen: boolean
  hasOverlay: boolean
  shouldCloseOnEsc: boolean
}
```

### Component Declaration

```typescript
// CORRECT: Named function declarations (not arrow functions for components)
export function UserProfile({ user }: UserProfileProps) {
  return <div>{user.name}</div>
}

// WRONG: Arrow function for component definition
export const UserProfile = ({ user }: UserProfileProps) => {
  return <div>{user.name}</div>
}

// CORRECT: Arrow functions are fine for inline callbacks in hooks
const handleClick = useCallback(() => {
  doSomething()
}, [])
```

### Props

```typescript
// CORRECT: Destructure props in function signature
function Avatar({ src, alt, size = 'medium' }: AvatarProps) {
  return <img src={src} alt={alt} />
}

// WRONG: Access props via props object
function Avatar(props: AvatarProps) {
  return <img src={props.src} alt={props.alt} />
}

// CORRECT: Explicit boolean props
<Modal isOpen={true} />
<Modal isOpen />  // Also acceptable for true

// WRONG: Implicit true for non-boolean-named props
<Modal open />
```

### Refs and DOM

```typescript
// CORRECT: useRef with proper typing
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return <input ref={inputRef} />
}

// CORRECT: forwardRef for reusable components
const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, ...props }, ref) {
    return (
      <InputWrapper>
        <InputLabel>{label}</InputLabel>
        <InputField ref={ref} {...props} />
      </InputWrapper>
    )
  }
)
```

### Key Props

```typescript
// CORRECT: Stable, unique keys
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// WRONG: Array index as key (causes issues with reordering)
{users.map((user, index) => (
  <UserCard key={index} user={user} />
))}

// WRONG: Random/generated keys
{users.map(user => (
  <UserCard key={Math.random()} user={user} />
))}
```

## File Organization

### Component Folder Structure

```
components/
  Button/
    Button.tsx          # Component logic only
    Button.styles.ts    # Styled components
    Button.types.ts     # TypeScript interfaces (optional, if complex)
    Button.test.tsx     # Tests
    index.ts            # Public exports

  UserCard/
    UserCard.tsx
    UserCard.styles.ts
    useUserCard.ts      # Component-specific hook
    index.ts
```

### Hooks Organization

```
hooks/
  useAuth.ts            # Global/shared hooks
  useDebounce.ts
  useLocalStorage.ts

components/
  SearchInput/
    useSearch.ts        # Component-specific hook lives with component
    SearchInput.tsx
```

### App Router Structure

```
app/
  layout.tsx            # Root layout
  page.tsx              # Home page
  globals.css           # Global styles only

  (auth)/               # Route group (no URL impact)
    login/
      page.tsx
    register/
      page.tsx

  dashboard/
    layout.tsx          # Nested layout
    page.tsx
    loading.tsx         # Loading UI
    error.tsx           # Error boundary

    settings/
      page.tsx

components/             # Shared components
lib/                    # Utilities, helpers
hooks/                  # Shared hooks
types/                  # Global TypeScript types
```

### Index File Exports

```typescript
// components/Button/index.ts
export { Button } from './Button'
export type { ButtonProps } from './Button.types'

// NEVER export styled components from index
// They are internal implementation details
```

## React Next.js Checklist

Before marking work complete:

### Component Quality
- [ ] No inline functions in JSX
- [ ] Business logic extracted to custom hooks
- [ ] Component file contains only rendering logic
- [ ] Props destructured in function signature
- [ ] Proper TypeScript interfaces for all props

### Styling
- [ ] Styles in separate `*.styles.ts` files
- [ ] No inline `style={{}}` props
- [ ] Transient props use `$` prefix
- [ ] No CSS-in-JS definitions in component files

### Next.js App Router
- [ ] Server Components by default
- [ ] `'use client'` only when necessary
- [ ] Client components pushed to leaf nodes
- [ ] Data fetching in Server Components
- [ ] Parallel fetching with `Promise.all` where applicable
- [ ] Proper metadata/SEO for pages

### Airbnb Conventions
- [ ] PascalCase for components
- [ ] camelCase with `use` prefix for hooks
- [ ] Named function declarations for components
- [ ] Boolean props prefixed with `is`/`has`/`should`
- [ ] Stable, unique keys (never array index)
- [ ] Event handlers use `handle` prefix
- [ ] Event props use `on` prefix
