import React, { Suspense, lazy } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Topbar from '../topbar';
import Home from '../home';
import Toasts from '../toasts';
import NotFound from '../NotFound';
import Results from '../Results';
import Student from '../student';
import Teacher from '../teacher';

import ErrorBoundary from '../ErrorBoundary';
import Footer from '../footer';
import LoadingSplashScreen from './LoadingSplashScreen';

const About = lazy(() => import('../about'));
const Contact = lazy(() => import('../contact'));
const Announcements = lazy(() => import('../announcements'));
const DemoTests = lazy(() => import('../demo-tests'));
const Faq = lazy(() => import('../faq'));
const Login = lazy(() => import('../login'));
const Admin = lazy(() => import('../admin'));
const SignUp = lazy(() => import('../signup'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    }
  }
});

export default function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="absolute inset-x-0 min-h-screen m-0 stack">
          <ErrorBoundary>
            <Topbar />
            <Routes>
              <Route index element={<Home />} />
              <Route
                path="/about-us"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <About />
                  </Suspense>
                )}
              />
              <Route
                path="/contact"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <Contact />
                  </Suspense>
                )}
              />
              <Route
                path="/announcements/*"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <Announcements />
                  </Suspense>
                )}
              />
              <Route
                path="/demo-tests/*"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <DemoTests />
                  </Suspense>
                )}
              />
              <Route
                path="/faq"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <Faq />
                  </Suspense>
                )}
              />
              <Route
                path="/results/*"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <Results />
                  </Suspense>
                )}
              />
              <Route
                path="/login/*"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <Login />
                  </Suspense>
                )}
              />
              <Route
                path="/admin/*"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <Admin />
                  </Suspense>
                )}
              />
              <Route
                path="/signup/*"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <SignUp />
                  </Suspense>
                )}
              />
              <Route
                path="/student/*"
                element={(
                  <Suspense fallback={<LoadingSplashScreen />}>
                    <Student />
                  </Suspense>
                )}
              />
              <Route path="/teacher/*" element={<Teacher />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </ErrorBoundary>
        </div>
        <Toasts />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
