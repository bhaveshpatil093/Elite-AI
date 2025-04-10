import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import TextGeneration from "./pages/TextGeneration";
import ImageGeneration from "./pages/ImageGeneration";
import VideoGeneration from "./pages/VideoGeneration";
import ChatInterface from "./pages/ChatInterface";
import VoiceGeneration from "./pages/VoiceGeneration";
import CodeGeneration from "./pages/CodeGeneration";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Bookmarks from "./pages/Bookmarks";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } 
            />
            <Route 
              path="/text" 
              element={
                <MainLayout>
                  <TextGeneration />
                </MainLayout>
              } 
            />
            <Route 
              path="/image" 
              element={
                <MainLayout>
                  <ImageGeneration />
                </MainLayout>
              } 
            />
            <Route 
              path="/video" 
              element={
                <MainLayout>
                  <VideoGeneration />
                </MainLayout>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <MainLayout>
                  <ChatInterface />
                </MainLayout>
              } 
            />
            <Route 
              path="/voice" 
              element={
                <MainLayout>
                  <VoiceGeneration />
                </MainLayout>
              } 
            />
            <Route 
              path="/code" 
              element={
                <MainLayout>
                  <CodeGeneration />
                </MainLayout>
              } 
            />
            <Route 
              path="/bookmarks" 
              element={
                <MainLayout>
                  <Bookmarks />
                </MainLayout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <MainLayout>
                  <Settings />
                </MainLayout>
              } 
            />
            <Route 
              path="/about" 
              element={
                <MainLayout>
                  <About />
                </MainLayout>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <MainLayout>
                  <UserProfilePage />
                </MainLayout>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
