
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  joinDate: "January 2024",
  totalInvestments: "$150,000",
  accountStatus: "Active",
};

const Profile = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>
      
      <Card className="p-6 bg-[#121214] border-white/10 mb-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm text-gray-400">Name</h2>
            <p className="text-white font-semibold">{mockUser.name}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-400">Email</h2>
            <p className="text-white font-semibold">{mockUser.email}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-400">Member Since</h2>
            <p className="text-white font-semibold">{mockUser.joinDate}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-400">Total Investments</h2>
            <p className="text-white font-semibold">{mockUser.totalInvestments}</p>
          </div>
          <div>
            <h2 className="text-sm text-gray-400">Account Status</h2>
            <p className="text-white font-semibold">{mockUser.accountStatus}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          className="bg-[#121214] border border-white/10 hover:bg-white/5"
          onClick={() => {}}
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
  );
};

export default Profile;
