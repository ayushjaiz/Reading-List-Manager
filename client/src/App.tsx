import { Auth } from "./_components/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/appStore";
import { BookDashboard } from "./_components/BookDashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient()

  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/dashboard" element={<BookDashboard />} />
            <Route path="/" element={<Auth />} />
            {/* <Route element={<ProtectedRoute />}>
                  <Route path="/browse" element={<BrowsePage />} />
                </Route> */}
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;



// export const App = () => {
//   return (
//         <BrowserRouter>
//           <Routes>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/" element={<Auth />} />
//             {/* <Route element={<ProtectedRoute />}>
//               <Route path="/browse" element={<BrowsePage />} />
//             </Route> */}
//           </Routes>
//         </BrowserRouter>
//   );
// };

// const root = createRoot(document.getElementById("root")!);
// root.render(<App />);


