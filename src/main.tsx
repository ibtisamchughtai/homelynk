import { StrictMode, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'

// Home is bundled with the app shell so the landing page paints immediately;
// the other pages are code-split and loaded by the router on demand.
const page = (load: () => Promise<{ default: ComponentType }>) => ({
  Component: async () => (await load()).default,
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    hydrateFallbackElement: <div className="min-h-screen bg-paper" aria-busy="true" />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'features', lazy: page(() => import('./pages/Features')) },
      { path: 'how-it-works', lazy: page(() => import('./pages/HowItWorks')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
], { basename: import.meta.env.BASE_URL })

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root is missing from index.html')

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
