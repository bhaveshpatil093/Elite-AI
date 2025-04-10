
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { User, Mail, Bell, Shield, Key, Globe, Clock } from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security">("profile");
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [loading, setLoading] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    usageReports: true
  });

  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully");
    }, 800);
  };

  const handleToggleNotification = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success(`Notification setting updated`);
  };

  return (
    <Card className="w-full border border-border/50 shadow-md">
      <CardHeader className="border-b border-border/30 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/20">
              <AvatarImage src="https://i.pravatar.cc/100" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl">{name}</CardTitle>
              <CardDescription>{email}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActiveTab("profile")} 
              className={activeTab === "profile" ? "bg-primary text-primary-foreground" : ""}>
              <User size={16} className="mr-1" />
              Profile
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("notifications")}
              className={activeTab === "notifications" ? "bg-primary text-primary-foreground" : ""}>
              <Bell size={16} className="mr-1" />
              Notifications
            </Button>
            <Button variant="outline" onClick={() => setActiveTab("security")}
              className={activeTab === "security" ? "bg-primary text-primary-foreground" : ""}>
              <Shield size={16} className="mr-1" />
              Security
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="flex gap-2 items-center">
                  <User size={16} className="text-muted-foreground" />
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex gap-2 items-center">
                  <Mail size={16} className="text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-border/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Account Created</p>
                      <p className="text-sm text-muted-foreground">January 15, 2023</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-border/50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Globe size={18} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium">Subscription Plan</p>
                      <p className="text-sm text-muted-foreground">Free Plan</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Upgrade</Button>
                </div>
              </div>
            </div>
            
            <Button onClick={handleSaveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
        
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Notification Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border/30">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive emails about your account activity</p>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications} 
                  onCheckedChange={() => handleToggleNotification("emailNotifications")} 
                />
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-border/30">
                <div>
                  <p className="font-medium">Product Updates</p>
                  <p className="text-sm text-muted-foreground">New features and improvements</p>
                </div>
                <Switch 
                  checked={notificationSettings.productUpdates} 
                  onCheckedChange={() => handleToggleNotification("productUpdates")} 
                />
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-border/30">
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-muted-foreground">Important security notifications</p>
                </div>
                <Switch 
                  checked={notificationSettings.securityAlerts} 
                  onCheckedChange={() => handleToggleNotification("securityAlerts")} 
                />
              </div>
              
              <div className="flex items-center justify-between pb-4 border-b border-border/30">
                <div>
                  <p className="font-medium">Marketing Emails</p>
                  <p className="text-sm text-muted-foreground">Promotional offers and news</p>
                </div>
                <Switch 
                  checked={notificationSettings.marketingEmails} 
                  onCheckedChange={() => handleToggleNotification("marketingEmails")} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Usage Reports</p>
                  <p className="text-sm text-muted-foreground">Weekly summaries of your account usage</p>
                </div>
                <Switch 
                  checked={notificationSettings.usageReports} 
                  onCheckedChange={() => handleToggleNotification("usageReports")} 
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Key size={18} className="text-muted-foreground" />
                    <p className="font-medium">Password</p>
                  </div>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
                <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
              </div>
              
              <div className="p-4 rounded-lg border border-border/50">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-muted-foreground" />
                    <p className="font-medium">Two-Factor Authentication</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end pt-6 border-t border-border/30">
        <div className="flex gap-2">
          {activeTab === "profile" && (
            <Button variant="default" onClick={handleSaveProfile} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          )}
          <Button variant="outline">Cancel</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
