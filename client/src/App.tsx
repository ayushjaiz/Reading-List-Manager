import { Auth } from "./_components/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/appStore";
import { BookDashboard } from "./_components/BookDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            {/* <Route path="/dashboard" element={<BookDashboard />} /> */}
            <Route path="/" element={<Auth />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<BookDashboard />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;


