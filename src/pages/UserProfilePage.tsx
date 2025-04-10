
import React from "react";
import UserProfile from "@/components/UserProfile";

const UserProfilePage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile settings and preferences</p>
      </div>
      
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;
