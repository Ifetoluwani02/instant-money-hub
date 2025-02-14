
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { UserCircle, Mail, Shield, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Profile = () => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/auth");
  };

  const handleEditProfile = () => {
    if (!user || !profile) return;
    setEditForm({
      name: profile.full_name || '',
      email: user.email || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveProfile = () => {
    if (!editForm.name || !editForm.email) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
    setIsEditDialogOpen(false);
  };

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="p-6 bg-[#121214] border-white/10">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4">
                  <UserCircle className="w-16 h-16 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-2">{profile.full_name || 'User'}</h2>
                <p className="text-sm text-gray-400">{profile.is_admin ? "Administrator" : "User"}</p>
              </div>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="p-6 bg-[#121214] border-white/10 mb-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <UserCircle className="w-5 h-5 text-primary" />
                  <div>
                    <h2 className="text-sm text-gray-400">Name</h2>
                    <p className="text-white font-semibold">{profile.full_name || 'User'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <h2 className="text-sm text-gray-400">Email</h2>
                    <p className="text-white font-semibold">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <h2 className="text-sm text-gray-400">Role</h2>
                    <p className="text-white font-semibold">{profile.is_admin ? "Administrator" : "User"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <div>
                    <h2 className="text-sm text-gray-400">Account Status</h2>
                    <p className="text-white font-semibold">Active</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                className="bg-[#121214] border border-white/10 hover:bg-white/5"
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#121214] text-white border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Name</label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="bg-[#1A1A1C] border-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Email</label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="bg-[#1A1A1C] border-white/10"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
