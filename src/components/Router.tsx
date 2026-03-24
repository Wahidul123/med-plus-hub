import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import DoctorsPage from '@/components/pages/DoctorsPage';
import DoctorDetailPage from '@/components/pages/DoctorDetailPage';
import ServicesPage from '@/components/pages/ServicesPage';
import AppointmentPage from '@/components/pages/AppointmentPage';
import FAQPage from '@/components/pages/FAQPage';
import ContactPage from '@/components/pages/ContactPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "doctors",
        element: <DoctorsPage />,
        routeMetadata: {
          pageIdentifier: 'doctors',
        },
      },
      {
        path: "doctors/:id",
        element: <DoctorDetailPage />,
        routeMetadata: {
          pageIdentifier: 'doctor-detail',
        },
      },
      {
        path: "services",
        element: <ServicesPage />,
        routeMetadata: {
          pageIdentifier: 'services',
        },
      },
      {
        path: "appointment",
        element: <AppointmentPage />,
        routeMetadata: {
          pageIdentifier: 'appointment',
        },
      },
      {
        path: "faq",
        element: <FAQPage />,
        routeMetadata: {
          pageIdentifier: 'faq',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
