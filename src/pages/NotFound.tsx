
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <BackButton />
          <Link to="/">
            <Button variant="default">Go to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
