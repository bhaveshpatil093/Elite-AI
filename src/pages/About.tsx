
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";

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
            EliteAI is a comprehensive AI platform created for a hackathon project to demonstrate the capabilities of modern AI technologies. It integrates Google Gemini and ElevenLabs APIs to provide a range of content generation tools in one unified interface.
          </p>
        </div>
        
        <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Google Gemini API",
            "ElevenLabs API",
            "Shadcn UI",
            "React Router",
          ].map((tech, index) => (
            <div key={index} className="bg-secondary/20 px-4 py-2 rounded-lg">
              {tech}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Github size={18} />
            <span>View on GitHub</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Key capabilities of the EliteAI platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Text generation with Google Gemini</li>
              <li>Image generation capabilities</li>
              <li>Voice synthesis with ElevenLabs</li>
              <li>Interactive AI chat functionality</li>
              <li>Code generation across multiple languages</li>
              <li>Intuitive, responsive user interface</li>
              <li>Secure API key management</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Future Enhancements</CardTitle>
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
