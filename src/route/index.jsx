import React from "react";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { FilterPage } from "../pages/FilterPage";

import Header from "../layouts/Header";
import RestaurantRegisterPage from "../pages/Restaurant/RestaurantRegisterPage";

import UserReview from "../pages/User/UserReview";
import LoginPage from "../pages/User/LoginPage";
import RegisterPage from "../pages/User/RegisterPage";
import BookmarkPage from "../pages/ProfilePage/BookmarkPage";
import RestaurantPage from "../pages/MainPage/RestaurantPage";
import ReviewPage from "../pages/ProfilePage/ReviewPage";
import EditProfilePage from "../pages/ProfilePage/EditProfilePage";
import OtherUserProfilePage from "../pages/ProfilePage/components/OtherUserProfilePage";
import ProtectedProfileRoute from "../feature/user/components/ProtectedProfileRoute";
import RedirectIfAuthenticated from "../feature/user/components/RedirectIfAuthenticated";
import GoogleMaps from "../pages/GoogleMaps";
// import Chat from "../pages/Chat";
// import Chat2 from "../pages/Chat2";
// import Chat3 from "../pages/Chat3";
// import MerchantContextProvider, {
//   MerchantContext,
// } from "../contexts/MerchantContext";
import MerchantContextProvider, {
  MerchantContext,
} from "../contexts/MerchantContext";
import MerchantLoginPage from "../pages/MerchantPage/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPageMerchant from "../pages/MerchantPage/RegisterPage";
import MerchantHomePage from "../pages/MerchantPage/MerchantHomePage";
const router = createBrowserRouter([
  { path: "/huntest", element: <GoogleMaps /> },
  // {
  //   path: "/chat1",
  //   element: (
  //     <div>
  //       <Chat />
  //       {/* <Chat2 /> */}
  //     </div>
  //   ),
  // },
  // {
  //   path: "/chat2",
  //   element: (
  //     <div>
  //       {/* <Chat /> */}
  //       <Chat2 />
  //     </div>
  //   ),
  // },
  // {
  //   path: "/chat3",
  //   element: (
  //     <div>
  //       {/* <Chat /> */}
  //       <Chat3 />
  //     </div>
  //   ),
  // },
  {
    path: "/",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <HomePage />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/profile",
        element: (
          <ProtectedProfileRoute>
            <ReviewPage />,
          </ProtectedProfileRoute>
        ),
      },
      {
        path: "profile/Bookmark",
        element: (
          <ProtectedProfileRoute>
            <BookmarkPage />
          </ProtectedProfileRoute>
        ),
      },

      {
        path: "profile/EditProfile",
        element: <EditProfilePage />,
      },

      {
        path: "profile/:userId",
        element: <OtherUserProfilePage />,
      },
      {
        path: "profile/Bookmark/:userId",
        element: <BookmarkPage />,
      },

      { path: "/review", element: <UserReview /> },
      {
        path: "/login",
        element: (
          <RedirectIfAuthenticated>
            <LoginPage />
          </RedirectIfAuthenticated>
        ),
      },
      { path: "/register", element: <RegisterPage /> },
      { path: "/restaurants/:id", element: <RestaurantPage /> },

      { path: "/restaurants/filter", element: <FilterPage /> },
      {
        path: '/merchant',
        element: (
          <MerchantContextProvider>
            <RestaurantRegisterPage />
          </MerchantContextProvider>
        )
      },

  
      {
        path: '/homepage',
        element: <HomePage />,
      },
      {
        path: '/merchant/login',
        element: <MerchantLoginPage />,
      },{
        path: '/merchant/register',
        element: <RegisterPageMerchant />,
      },
    ],
  },
  {
    path: "/merchant/:restaurantId",
    element: (
      <div className="flex flex-col min-h-screen">
        <Header />
        <MerchantHomePage />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: "/merchant/createRestaurant/:merchantId",
        element: (
          <MerchantContextProvider>
            <RestaurantRegisterPage />
          </MerchantContextProvider>
        ),
      },

      {
        path: "/merchant/login",
        element: <MerchantLoginPage />,
      },
      {
        path: "/merchant/register",
        element: <RegisterPageMerchant />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
