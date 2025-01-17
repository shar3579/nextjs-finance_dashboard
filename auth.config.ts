import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login', // Redirect unauthenticated users to this page
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Check if the user is logged in
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard'); // Check if user is accessing a protected route

      if (isOnDashboard) {
        if (isLoggedIn) return true; // Allow access to the dashboard if logged in
        return false; // Redirect unauthenticated users to the login page
      }

      // If the user is already logged in and tries to access the login page, redirect them to the dashboard
      const isOnLoginPage = nextUrl.pathname === '/login';
      if (isOnLoginPage && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl)); // Redirect logged-in users to dashboard
      }

      // Allow access to all other pages (e.g., homepage)
      return true;
    },
  },
  providers: [], // Add providers here
} satisfies NextAuthConfig;
