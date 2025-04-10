import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Zap, Shield, Code, Image, MessageSquare, Video, Mic, Bookmark } from "lucide-react";

const About = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="card-glass p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">About EliteAI</h1>
        <p className="text-xl mb-6">
          An all-in-one AI-powered platform that enables users to effortlessly generate high-quality text, images, videos, chat responses, voice outputs, and code.
        </p>
        
        <div className="bg-secondary/30 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
          <p className="text-muted-foreground">
            EliteAI is a comprehensive AI platform created for a hackathon project to demonstrate the capabilities of modern AI technologies. It integrates multiple AI services including Google Gemini, Hugging Face, and ElevenLabs APIs to provide a range of content generation tools in one unified interface.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Google Gemini API",
            "Hugging Face API",
            "ElevenLabs API",
            "Shadcn UI",
            "React Router",
            "TanStack Query",
          ].map((tech, index) => (
            <div key={index} className="bg-secondary/20 px-4 py-2 rounded-lg">
              {tech}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <a href="https://github.com/bhaveshpatil093/Elite-AI" target="_blank" rel="noopener noreferrer">
              <Github size={18} />
              <span>View on GitHub</span>
            </a>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Features
            </CardTitle>
            <CardDescription>
              Key capabilities of the EliteAI platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Text generation with multiple models (Gemini, Llama 2, Mistral)</li>
              <li>Image generation with Stable Diffusion</li>
              <li>Voice synthesis with ElevenLabs' natural-sounding voices</li>
              <li>Interactive AI chat with context awareness</li>
              <li>Code generation across multiple programming languages</li>
              <li>Intuitive, responsive user interface with dark/light themes</li>
              <li>Secure API key management with local storage</li>
              <li>Bookmark system for saving favorite generations</li>
              <li>Real-time generation status tracking</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Supported Models
            </CardTitle>
            <CardDescription>
              AI models available in the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Text Generation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Google Gemini Pro</li>
                  <li>Llama 2 (7B & 13B)</li>
                  <li>Mistral 7B</li>
                  <li>DeepSeek Chat</li>
                  <li>DeepSeek Coder</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Image Generation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Stable Diffusion XL</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Voice Generation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>ElevenLabs Multilingual V2</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Development Status
            </CardTitle>
            <CardDescription>
              Current state of the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Completed Features</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Text generation with multiple providers</li>
                  <li>Image generation with Stable Diffusion</li>
                  <li>Voice synthesis with ElevenLabs</li>
                  <li>Basic chat interface</li>
                  <li>Code generation</li>
                  <li>Settings and API key management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">In Progress</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Video generation capabilities</li>
                  <li>Enhanced chat interface</li>
                  <li>User authentication system</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              Future Enhancements
            </CardTitle>
            <CardDescription>
              Planned improvements for the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Full video generation capabilities</li>
              <li>User accounts and saved generations</li>
              <li>Additional AI model integrations</li>
              <li>Advanced customization options</li>
              <li>Batch processing for multiple generations</li>
              <li>Template library for common use cases</li>
              <li>Analytics and usage tracking</li>
              <li>Collaborative features</li>
              <li>API documentation and examples</li>
              <li>Mobile-responsive design improvements</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="card-glass p-6 rounded-xl text-center">
        <h2 className="text-xl font-semibold mb-2">Get Started</h2>
        <p className="text-muted-foreground mb-4">
          Ready to explore EliteAI's capabilities?
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/settings">
            <Button variant="default">Configure API Keys</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
