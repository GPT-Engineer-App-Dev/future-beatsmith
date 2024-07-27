import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center space-y-6 p-8 bg-black bg-opacity-50 rounded-lg">
        <h1 className="text-5xl font-bold text-white">Future Beats</h1>
        <p className="text-xl text-gray-200">Create your own futuristic rhythms inspired by Daft Punk</p>
        <Button asChild size="lg" className="mt-4">
          <Link to="/beatmaker">Start Making Beats</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
